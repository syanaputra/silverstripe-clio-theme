# Using the Clio theme

* Copy the clio into the `themes/` directory of your SilverStripe project.  If you've named it correctly, there should be a directory called `themes/clio/templates`.
 
* Add the following to your `app/_config.php` file.  Remove any existing `SSViewer::set_theme` lines.

      SSViewer::set_theme("clio");
      HtmlEditorConfig::get('cms')->setOption('theme_advanced_styles', 'highlight=highlight;no-border=no-border,break=break');
