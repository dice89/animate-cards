var module = angular.module('cardsmodule', []);

module.directive("items",
    function() {
        return {
            restrict: "E",
            scope: !0,
            templateUrl: "items.html",
            link: function(elem) {

                var pixel_threshold = 20;

                //prevent default
                $("#slidermain").bind("touchmove", function(event) {
                    event.preventDefault();
                });

                $("#slidermain").on("touchstart mousedown", function(event1) {
                    console.log(event1);
                    event1.preventDefault
                    elem.$apply(function() {
                        elem.touchStart = event1.originalEvent.touches ? event1.originalEvent.touches[0].pageX : event1.originalEvent.pageX
                    });
                }).on("touchmove mousemove", function(touchmove_event) {
                    if (elem.touchStart && elem.touchStart != 0) {
                        elem.$apply(function() {
                            //if not ignore movement
                            var cur_coordinates;
                            if (touchmove_event.originalEvent.touches) {
                                cur_coordinates = touchmove_event.originalEvent.touches[0].pageX;
                            } else {
                                cur_coordinates = touchmove_event.originalEvent.pageX;
                            }
                            var like_div = $($(".like")[0]),
                                dislike_div = $($(".dislike")[0]),
                                whole_div = $($(".animate-partial")[0]);


                            if (Math.abs(elem.touchStart - cur_coordinates) > pixel_threshold) {
                                //make partial animation

                                if (elem.touchStart > cur_coordinates) {
                                    like_div.removeClass("active");
                                    dislike_div.addClass("active");
                                    whole_div.addClass("animate-dislike-partial");
                                      whole_div.removeClass("animate-like-partial");
                                } else {
                                    dislike_div.removeClass("active");
                                    whole_div.addClass("animate-like-partial");
                                    whole_div.removeClass("animate-dislike-partial");
                                    like_div.addClass("active");
                                }
                            } else {
                                //remove classes from elements
                                whole_div.removeClass("animate-like-partial");
                                whole_div.removeClass("animate-dislike-partial");
                                like_div.removeClass("active");
                                dislike_div.removeClass("active");
                            }
                            elem.touchLast = cur_coordinates;
                        });
                    }
                }), $("#slidermain").on("touchend mouseup", function() {

                    if (elem.touchLast !== 0) {
                        if (Math.abs(elem.touchStart - elem.touchLast) >= pixel_threshold) {
                            //do nothing
                            console.log("touchended 1 " + elem.touchLast);
                            var like_div = $($(".like")[0]),
                                dislike_div = $($(".dislike")[0]),
                                whole_div = $($(".animate")[0]);

                            whole_div.removeClass("animate-like-partial");
                            whole_div.removeClass("animate-dislike-partial");
                            like_div.removeClass("active");
                            dislike_div.removeClass("active");
                            if (elem.touchLast > elem.touchStart) {
                                //elem.likeProduct()
                                elem.likeElement();
                                console.log("like Produkt");
                                whole_div.addClass("animate-like");
                            } else {
                                elem.dislikeElement();
                                //elem.dislikeProduct()
                                console.log("dislike Product");
                                whole_div.addClass("animate-dislike");
                            }

                            elem.touchStart = 0;
                            elem.touchLast = 0;

                            setTimeout(function() {
                                elem.dragging = false;
                            }, 300);
                        }
                    }
                    console.log("touchended" + elem.touchLast);

                });

                console.log(elem);
            },
            controller: ["$scope", "$http",
                function($scope, $http) {

                    $scope.likedElements = [];

                    $scope.dislikedElements =[];

                    $scope.elements = [{
                        name: "Zuchini",
                        image: "/img/paprika_test.jpg"
                    }, {
                        name: "Pepper",
                        image: "/img/paprika_test.jpg"
                    }, {
                        name: "Mushrooms",
                        image: "/img/paprika_test.jpg"
                    }, {
                        name: "Cat",
                        image: "/img/paprika_test.jpg"
                    }, {
                        name: "Dodo",
                        image: "/img/paprika_test.jpg"
                    }, {
                        name: "Dog",
                        image: "/img/paprika_test.jpg"
                    }];


                  $scope.likeElement= function(){
                    //add elements to stack of liked elements
                    var got_element = $scope.elements.pop();
                    $scope.likedElements.push(got_element);
                    //ad remove from normal
             
                    $scope.getData();
                  };

                  $scope.dislikeElement= function(){
                   //add elements to stack of liked elements
                   var got_element = $scope.elements.pop();
                    $scope.dislikedElements.push(got_element);
                    //ad remove from normal
   
                    $scope.getData();
                  };

                  $scope.getData = function(){
                    //get elements from rest source
                    //TODO
                    // Reconstruct Stack
                    $scope.apply
                  };

                }
            ]
        }
    });