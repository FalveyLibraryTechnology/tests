module.exports = function() {

  var ptor;

  this.World = function World(callback) {
  	browser.ignoreSynchronization = true;
	this.prop = "Hello from the World!"; // this property will be available in step definitions
    ptor = protractor.getInstance();

	this.greetings = function(name, callback) {
      console.log("\n----Hello " + name);
      callback();
	};

      //Left Panel

      var thumbsListWidth;
      var thumbnailSize = { width: null, height: null };

      this.getThumbsListWidth = function(){
          return thumbsListWidth;
      };
      this.setThumbsListWidth = function(value){
          thumbsListWidth = value;
      };

      this.getThumbnailSize = function(){
          return thumbnailSize;
      };
      this.setThumbnailSize = function(width, height){
          thumbnailSize.width = width;
          thumbnailSize.height = height;
      };

      this.contractLeftPanelArrow = function(callback){
          var that = this;
          ptor.findElement(protractor.By.css('.leftPanel .collapseButton'))
              .then(
              function(el){
                  el.click().then(
                    function(){
                        that.SetLeftPanelWidth(callback);
                    }
                  );
              },
              function(){
                  callback.fail('Colapse button not found');
              });
      };

      this.expandThumbnailsTab = function(callback){
          var that = this;
          ptor.findElement(protractor.By.css('.leftPanel .expandFullButton'))
              .then(
              function (el) {
                el.click().then(
                    function(){
                        that.SetLeftPanelWidth(callback);
                    },
                    function(){
                        that.SetLeftPanelWidth(callback);
                    }
                );
              },
              function () {
                  callback.fail("Expand thumbnails button not found");
              }
          ),
          function(){
              that.SetLeftPanelWidth(callback);
          };
      };

      this.SetLeftPanelWidth = function(callback){
          var that = this;
          ptor.findElement(protractor.By.css('.leftPanel'))
              .then(
              function(lPnl) {
                  lPnl.getCssValue('width')
                      .then(function (w) {
                          that.setThumbsListWidth(w);
                          console.log('word.js thumbsListWidth ');
                          console.log('word.js w ' + w);
                          callback();
                      });
              },
              function(){
                  callback.fail('leftPanel not found');
              });
      };

      this.GetCurrentThumbnailSize = function(callback){
          ptor.sleep(6000).then(function() {
              ptor.findElements(protractor.By.css('.thumb .wrap.loaded'))
                  .then(function (thumbnail) {
                      var obj = {width: null, height: null};
                      //console.log('will get size');
                      //thumbnail[0].getSize()
                      //    .then(function (size) {
                      //        console.log('got size');
                      //        obj = size;
                      //        callback(obj);
                      //    });

                      thumbnail[0].getCssValue('width')
                          .then(function(width){
                              console.log('tSize w ' + width);
                              obj.width = width;
                              thumbnail[0].getCssValue('height')
                                  .then(function(height){
                                      console.log('tSize h ' + height);
                                      obj.height = height;
                                      callback(obj);
                                  });
                          });
                  });
          });
      };


      this.GetCurrentThumbnailSizeAfter = function(callback){
          ptor.findElements(protractor.By.css('.thumb .wrap.loaded'))
              .then(function(thumbnail) {
                  var obj = {width: null, height: null};
                  console.log('will get size after');
                  thumbnail[0].getCssValue('width')
                      .then(function(width){
                          console.log('tSize w ' + width);
                          obj.width = width;
                          thumbnail[0].getCssValue('height')
                              .then(function(height){
                                  console.log('tSize h ' + height);
                                  obj.height = height;
                                  callback(obj);
                              });
                      });
              });
      };

      this.SetThumbnailSizeWithCurrent = function(callback){
          var that = this;
          function set(current){
              that.setThumbnailSize(current.width, current.height);
              callback();
          }
          var current = this.GetCurrentThumbnailSize(set);

      };

      
  	callback(); // tell Cucumber we're finished and to use 'this' as the world instance

	  //Viewer frame functions TODO: Page Object
  };


}

