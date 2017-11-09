"use strict";

var expect = require("chai").expect;
var txty = require("../index");
var txty2 = txty;

describe("#txty", function() {
  it("should initialise without options, using default options", function() {
    var result = txty.init();
    expect(result.debug).to.equal(true);
    expect(result.lang).to.equal("en");
  });

  it("with debug on, it should return 'module_test', including debug wrapper", function() {
    txty.init({ debug: true });
    var result = txty.get("module_test");
    expect(result).to.equal("<lang='Test'/>");
  });

  it("with debug on, it should return 'module_thislang', excluding debug wrapper", function() {
    txty.init({ debug: true });
    var result = txty.get("module_thislang");
    expect(result).to.equal("English");
  });

  it("with debug on, missing argument should return an error, including debug wrapper", function() {
    txty.init({ debug: true });
    var result = txty.get();
    expect(result).to.equal("<lang='No reference provided'/>");
  });

  it("with debug off, missing argument should return an error, excluding debug wrapper", function() {
    txty.init({ debug: false });
    var result = txty.get();
    expect(result).to.equal("No reference provided");
  });

  it("with debug on, incorrect argument should return an error, including debug wrapper", function() {
    txty.init({ debug: true });
    var result = txty.get("abcd");
    expect(result).to.equal("<lang='Not a valid reference: abcd'/>");
  });

  it("with debug off, incorrect argument should return an error, excluding debug wrapper", function() {
    txty.init({ debug: false });
    var result = txty.get("abcd");
    expect(result).to.equal("Not a valid reference: abcd");
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

  it("should switch language and add a new dictionary language via options, and output text in new language", function() {
    txty.init({ lang: "fr", dictionary: { fr: { module_test: "Tester" } } });
    var result = txty.get("module_test");
    expect(result).to.equal("Tester");
  });

  it("should set lang to default 'en' if options lang is removed", function() {
    txty2.init();
    txty2.init({ lang: undefined });
    var result = txty2.txt;
    expect(result).to.equal("No language defined");
  });

  it("should set lang to default 'en' if options lang is removed", function() {
    txty2.init({ lang: "de" });
    var result = txty2.txt;
    expect(result).to.equal("No dictionary defined");
  });
});
