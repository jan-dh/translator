<?php
/**
 * Translator plugin for Craft CMS 3.x
 *
 * A translation field for Craft CMS
 *
 * @link      https://www.thebasement.be/
 * @copyright Copyright (c) 2019 Jan D'Hollander
 */

namespace jandh\translator;

use jandh\translator\fields\TranslatorField;

use Craft;
use craft\base\Plugin;
use craft\events\ElementEvent;
use craft\services\Fields;
use craft\services\Elements;
use craft\helpers\ElementHelper;
use craft\events\RegisterComponentTypesEvent;

use yii\base\Event;

/**
 * Class Translator
 *
 * @author    Jan D'Hollander
 * @package   Translator
 * @since     0.1.0
 *
 */
class Translator extends Plugin
{
    // Static Properties
    // =========================================================================

    /**
     * @var Translator
     */
    public static $plugin;

    // Public Properties
    // =========================================================================

    /**
     * @var string
     */
    public $schemaVersion = '0.1.0';

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;

        Event::on(
            Fields::class,
            Fields::EVENT_REGISTER_FIELD_TYPES,
            function (RegisterComponentTypesEvent $event) {
                $event->types[] = TranslatorField::class;
            }
        );

        Event::on(
            Elements::class,
            Elements::EVENT_BEFORE_SAVE_ELEMENT,
            function (ElementEvent $event) {
                $element = $event->element;
                if (!ElementHelper::isDraftOrRevision($element) and isset($_POST['fields'])) {
                    $translationsFromInput = [];
                    $translatorFields = array_filter($_POST['fields'], function ($key) {
                        return strpos($key, 'translator-') === 0;
                    }, ARRAY_FILTER_USE_KEY);


                    foreach($translatorFields as $string){
                        $array = json_decode($string, true);
                        if (gettype($array) == 'array' and !empty($array)) {
                            $flattendArray = array_merge(...$array);
                            $translationsFromInput = array_merge($translationsFromInput, $flattendArray);
                        }
                    }

                    if ($translationsFromInput) {
                        $currentSite = Craft::$app->request->getParam('site');
                        $locale = Craft::$app->sites->getSiteByHandle($currentSite)->language;

                        $translationPath = Craft::$app->Path->getSiteTranslationsPath();
                        $translationFolder = $translationPath . '/' . $locale;
                        $file = $translationPath . '/' . $locale . '/site.php';

                        if (!file_exists ($file)) {
                            // Check if locale dir exists
                            if (!file_exists($translationFolder)) {
                                mkdir($translationFolder, 0777, true);
                            }
                            file_put_contents($file,  '<?php return ' . var_export($translationsFromInput, true) . ';');
                        } else{
                            $translationsFromFile = include $file;
                            foreach ($translationsFromInput as $key => $value) {
                                if (isset($translationsFromFile[$key]) and $value != "") {
                                    $translationsFromFile[$key] = $value;
                                } else{
                                    $translationsFromFile[$key] = $value;
                                }
                            }
                            file_put_contents($file,  '<?php return ' . var_export($translationsFromFile, true) . ';');
                        }
                    }
                }
            }
        );
    }

}
