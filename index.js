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
        module_no_ref: "No reference provided",
        module_undefined: "Not a valid reference: ",
        module_no_language: "No language defined",
        module_no_dictionary: "No dictionary defined",
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
    console.log("test " + this.defaults.lang);
    this.txt = this.getDictionary(this.options.lang, this.defaults.lang);

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

  getItem: function(thisitem, debug_override) {
    /* items in language files can be:
    *  type string (plain, debuggable items)
    *  type array (of 1 string) will not be modified during debugging, for use with e.g. URLs)
    */
    if (typeof debug_override === "undefined") {
      debug_override = true;
    }
    var output = "";
    if (Array.isArray(this.txt[thisitem])) {
      return this.txt[thisitem][0];
    } else {
      if (this.options.debug && debug_override) {
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
      var err = this.defaults.dictionary.en.module_no_ref;
      if (this.options.debug) {
        console.log(err);
        return this.defaults.debug_prefix + err + this.defaults.debug_suffix;
      }
      return err;

      //not a valid reference
    } else if (typeof this.getItem(ref, false) === "undefined") {
      var err = this.defaults.dictionary.en.module_undefined + ref;
      if (this.options.debug) {
        console.log(err);
        return this.defaults.debug_prefix + err + this.defaults.debug_suffix;
      }
      return err;

      // return a valid reference
    } else {
      return this.getItem(ref);
    }
  },

  getDictionary: function(lang, defaultlang) {
    if (typeof lang === "undefined") {
      if (typeof defaultlang === "undefined") {
        var err = "No language defined";
        console.log(err);
        return err;
      }
      lang = defaultlang;
    }

    if (typeof this.options.dictionary[lang] === "undefined") {
      if (typeof this.defaults.dictionary[lang] === "undefined") {
        var err = "No dictionary defined";
        console.log(err);
        return err;
      }
      return this.defaults.dictionary[lang];
    }
    return this.options.dictionary[lang];
  }
};
