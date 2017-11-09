"use strict";

var expect = require("chai").expect;
var txty = require("../index");

describe("#txty", function() {
  it("should initialise without options, using default options", function() {
    var result = txty.init();
    expect(result.debug).to.equal(true);
    expect(result.lang).to.equal("en");
  });

  it("with debug on, it should return 'module_test', including debug wrapper", function() {
    var result = txty.get("module_test");
    expect(result).to.equal("<lang='Test'/>");
  });

  it("with debug on, it should return 'module_thislang', excluding debug wrapper", function() {
    var result = txty.get("module_thislang");
    expect(result).to.equal("English");
  });

  it("with debug off, it should return 'module_test', excluding debug wrapper", function() {
    txty.init({ debug: false });
    var result = txty.get("module_test");
    expect(result).to.equal("Test");
  });

  it("should switch language and add a new dictionary language via options, and output text in new language", function() {
    txty.init({ lang: "fr", dictionary: { fr: { module_test: "Tester" } } });
    var result = txty.get("module_test");
    expect(result).to.equal("Tester");
  });
});
