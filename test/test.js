var expect = require('expect.js')
  , path = require('path')
  , util = require('g-file')
  , blueimp = require('blueimp-md5')
  , md5 = require('../')
  , testData = ['', 'ss', './demo.css','./demo.js','./demo.html'].map(function(item){
      return path.resolve(__dirname, item);
    })
  , expected = {};

testData.forEach(function (item){
  if(util.isFile(item)){
    expected[item] = blueimp.md5(item);
  } else {
    expected[item] = null;
  }
});

describe('md5-image-path', function(){
  describe('#md5(Array)', function(){
    it('It works!', function(){
      var result = md5({files: testData});
      expect(result).to.be.an(Array);
      expect(result).to.have.length(testData.length);
      result.forEach(function (item){
        expect(item.md5).to.be(expected[item.file]);
      });
    })
  })


  describe('#md5(String)', function(){
    it('It works!', function(){
      testData.forEach(function (item){
        var result = md5({files: item});
        expect(result).to.be.an(Array)
        expect(result).to.have.length(1);
        result.forEach(function (v){
          expect(v.md5).to.be(expected[v.file]);
        });
      })
    })
  })
})