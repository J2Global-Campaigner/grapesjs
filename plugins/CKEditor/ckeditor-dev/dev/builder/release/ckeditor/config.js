/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.editorConfig = function ( config ) {
	config.format_tags = "pre";
	config.removeDialogTabs = "image:advanced;link:advanced";
	config.removePlugins = "magicline";
	config.autoParagraph = !1;
	config.language = "en";
	config.coreStyles_bold = { element: "b", overrides: "strong" };
	config.enterMode = CKEDITOR.ENTER_BR;
	config.extraAllowedContent = '*(*);*{*}'; // Allows any class and any inline style
	config.allowedContent = true;

}
