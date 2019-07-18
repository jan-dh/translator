/**
 * Translator plugin for Craft CMS
 *
 * Translator Field JS
 *
 * @author    Jan D'Hollander
 * @copyright Copyright (c) 2019 Jan D'Hollander
 * @link      https://www.thebasement.be/
 * @package   Translator
 * @since     0.1.0TranslatorTranslator
 */

 ;(function ( $, window, document, undefined ) {

    var pluginName = "TranslatorTranslator",
        defaults = {
        };

    // Plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function(id) {
            var _this = this;

            var field = document.getElementById(_this.options.prefix + 'translator-' + _this.options.field.id);
            var rows = field.querySelectorAll('[data-row]');
            var results = {};

            $(rows).each(function(){
                $(this).find('input').on('input', function(){
                    updateValues();
                });
            })

            function updateValues(){
                var input = document.querySelector('#' +  _this.options.prefix + _this.options.field.id);

                $(rows).each(function(i, row){
                    var keyEl = row.querySelector('[data-key]');
                    var key = keyEl.dataset['key'];

                    var value = row.querySelector('.js-value').value;
                    var item = {};
                    if (value !=='') {
                        item[key] = value;
                        results[i] = item;
                    }
                });
                input.value = JSON.stringify(results);
            }
        },
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
