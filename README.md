# Translator plugin for Craft CMS 3.x & 4.x

A translation field for Craft CMS to add translatable text snippets from your templates to entries, channels, globals.

![Screenshot](resources/img/translator.svg)

## Requirements

This plugin requires Craft CMS 3.x or 4.x.

## Installation

To install the plugin, follow these instructions.

1. Open your terminal and go to your Craft project:

        cd /path/to/project

2. Then tell Composer to load the plugin:

        composer require jandh/translator

3. In the Control Panel, go to Settings → Plugins and click the “Install” button for Translator.

## Translator Overview

Translator is a field type, that provides a UI in the form of a field for static translations from your templates. This way authors can edit translatable text snippets in the actual entry, category, ... they are used in. Making the translations editable on this level provides ensures a better author experience.

## Using Translator

Translator will pick up all the static translations from your templates and provides them as an option for your field.

Saving a new translation will add it to the static translations file (`translations/locale/site.php`). If no value exists or the file does not exists it will add it to the file or generate the file.


## Translator Roadmap

* 👀 Add modules folder to the translation sources

Brought to you by [Jan D'Hollander](https://www.thebasement.be/)
