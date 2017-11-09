"use strict";
module.exports = {
  options: {},
  defaults: {
    lang: "en",
    debug: true,
    debug_prefix: "<lang='",
    debug_suffix: "'/>",
    dictionary: {
      en: {
        module_language: ["Txty language set to "],
        module_thislang: ["English"],
        module_debug_start: ["###Txty debug mode is on. "],
        module_debug_end: ["###Txty"],
        module_settings: ["Settings are..."],
        module_test: "Test"
      }
    }
  },
  txt: {},

  //initialise and override defaults with options
  init: function(options) {
    //set defaults
    this.options = this.defaults;
    if (typeof options !== "undefined") {
      //or set supplied options
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          this.options[key] = options[key];
        }
      }
    }
    //get relevant language dictionary into this.txt
    this.getDictionary(this.options.lang);

    //debugging
    if (this.options.debug) {
      console.log(this.getItem("module_debug_start"));
      console.log(this.getItem("module_language") + this.getItem("module_thislang"));
      console.log(this.getItem("module_settings"));
      console.dir(this.defaults);
      console.log(this.getItem("module_debug_end"));
    }
    return this.options;
  },

  getItem: function(thisitem) {
    /* items in language files can be:
    *  type string (plain, debuggable items)
    *  type array (of 1 string) will not be modified during debugging, for use with e.g. URLs)
    */
    var output = "";
    if (Array.isArray(this.txt[thisitem])) {
      return this.txt[thisitem][0];
    } else {
      if (this.options.debug) {
        return this.options.debug_prefix + this.txt[thisitem] + this.options.debug_suffix;
      } else {
        return this.txt[thisitem];
      }
    }
  },

  get: function(ref) {
    //return the string based on supplied reference

    //no reference
    if (arguments.length === 0) {
      if (this.options.debug) {
        console.log("Language: No reference provided");
      }
      return;

      //no valid reference
    } else if (typeof this.getItem(ref) === "undefined") {
      if (this.options.debug) {
        console.log("Language [" + ref + "] is not a valid reference");
      }
      return "***Language reference [" + ref + "] not found***";

      // return a valid reference
    } else {
      return this.getItem(ref);
    }
  },

  getDictionary: function(lang) {
    if (typeof lang === "undefined") {
      this.txt = this.defaults.dictionary[lang];
    } else {
      this.txt = this.options.dictionary[lang];
    }
  }
};
