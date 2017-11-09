# Txty

[![Build Status](https://travis-ci.org/Swiftaff/txty.svg?branch=master)](https://travis-ci.org/Swiftaff/txty)
[![Coverage Status](https://coveralls.io/repos/github/Swiftaff/txty/badge.svg?branch=master)](https://coveralls.io/github/Swiftaff/txty?branch=master)

A basic language pack manager to make it easy to swap out all the text in your node.js app interface.

It doesn't translate anything though :-) You will need to go get all the translations you need for your dictionary files yourself. There may be better alternatives out there, but this is a simple project with no bells and whistles.

* Just use it with a single language, to help keep the wording used within your interface elements consistent and easy to update in one place, e.g. `page_title: "Welcome to txty"` or `homepage_download_button: "Download Free Now!"`
* Turn on debugging to [**highlight**] your **txty**-fied text in the front-end, so you can easily hunt down un-**txty**-fied text!
* Add other language dictionary files so you can easily and consistently change language
* No dependencies

## Installation

This is just Javascript, but it is intended for Node.js use
1. [Download](https://nodejs.org/en/download/) and [Install](https://docs.npmjs.com/getting-started/installing-node) Node.js
2. Create your project any way you like, e.g. using [Express](https://www.npmjs.com/package/express)
3. Install **txty** `npm install txty --save`

## Require
Include **txty** at the top of any js file where you wish to **txty**-fy your plain text `var txty = require("txty");`

or, e.g. if you are using Express, simply include once in your main app.js, and just pass the **txty** variable around as needed using locals `req.app.locals.txty = require("txty");`

## init(options)
Initialise **txty** with it's default options (see defaults below)
`txty.init();`

Or Initialise with options (see options below).
`txty.init( { lang: "en" } );`

Run the same command with different settings later, e.g. to change language, or alter the dictionary
`txty.init( { lang: "fr" } );`

Then, wherever required in your js, replace any instances of plain text...
`var outputText = "Download Free Now!"`
...with a ***txty*** call to your predefined key/value pair
`var outputText = txty.get("homepage_download_button")`

## Options

### dictionary
Should contain one object for each language, e.g. English, French and Klingon. Minimum one language.
```
dictionary: {
    en: {},
    fr: {},
    kl: {}
}
```
Then within each language, simply create the same keys with the relevant values for each language, e.g.
```
dictionary: {
    en: {
        hello: "Hello",
        goodbye: "Goodbye"
    },
    fr: {
        hello: "Bonjour",
        goodbye: "Au Revoir"
    },
    kl: {
        hello: "nuqneH",
        goodbye: "DaH jImej"
    }
}
```
or define your dictionaries in separate files, and require them
```
dictionary: {
    en: require("./languages/en.js"),
    fr: require("./languages/fr.js"),
    kl: require("./languages/kl.js")
}
```
in which case the 'kl.js' file would contain...
```
"use strict";
module.exports = kl: {
    hello: "nuqneH",
    goodbye: "DaH jImej"
};
```

Note: you may not want all your text to be changed during debug mode, such as URLs. Simply wrap the string in an array, and it will be ignored by the `debug_prefix` or `debug_suffix` wrappers, e.g.
```
"use strict";
module.exports = en: {
    admin_url: ["/myadmin/subpage"],//this will not be wrapped during debugging
    admin_title: "My admin Subpage" //this will
};
```

#### dictionary: default
Includes a very basic starter! Keep these items in your language files for nice debug output.
```
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
```

### lang
Sets the language dictionary which **txty** should refer to. Must match one of those in your dictionary, e.g.
`lang: "kl"`
You can change language at any time using init (see above)

#### lang: default
`lang: "en"`

### debug
To help you identify any stray text which you may not yet have **txty**-fied, debug will wrap each txty.get() output with the prefix and suffix of your choice.

Note: See above to exclude certain text from the debug wrapping.

#### debug: default
e.g. with the default settings...
```
debug: true,
debug_prefix: "<lang='",
debug_suffix: "'/>",
```
This would change...
```
var outputText = txty.get("homepage_download_button")
```
from `Download Free Now!` to `<lang=Download Free Now!/>`

## License
This project is licensed under the MIT License.
