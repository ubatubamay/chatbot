import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Conversation from '../src/components/Widget/Conversation';

describe("A suite is just a function", function() {
    var a;
  
    iit("and so is a spec", function() {
      a = true;
  
      expect(a).toBe(true);
    });
});


xdescribe('Conversation', function() {
  var Utils = TestUtils;

  xit('Render without error', function() {
    var component, element;
    element = React.createElement(
      Conversation,
      {}
    );

    expect(function() {
      component = Utils.renderIntoDocument(element);
    }).not.toThrow();
  });
});