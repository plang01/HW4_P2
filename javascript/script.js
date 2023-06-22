/*
    File: script.js
    GUI Assignment: Use Jquery plugin to add tab and slider widget
    Phat Lang, UMass Lowell Computer Science, Phat_Lang@student.uml.edu
    What to submit: Readme file with Github URL and link to repository, a zip file contains the code 
    Description: Add slider and tab using jQuery UI plugin. The slider is responsive to the input field and vice versa.
    Additionally, implement a feature to delete multiple tabs selected. 
    Copyright (c) 2023 by Phat Lang. All rights reserved. May be freely copied or
    excerpted for educational purposes with credit to the author. Updated by Phat Lang on June 22 at 12:33 p.m
    References/Citations: I used jQueryUI for references. 
    Additionally, I took some of the codes from these website
      https://jqueryui.com/tabs/#manipulation
      https://infoheap.com/jquery-ui-slider-and-input-text-box-two-way-binding/
*/

function get_Input(table_id){
    var table_value;
    // Get user input
    table_value = document.getElementById(table_id).value;
    table_value = Number(table_value);
    return table_value;
  }
  
  function generate_Table(id){
    //Remove old table to generate a new one
    var div = document.getElementById(id);
    while(div.firstChild != null){
      div.removeChild(div.firstChild);
    }
      // Get user inputs
      var min_column = get_Input('table_min_column field1');
      var max_column = get_Input('table_max_column field2');
      var min_row = get_Input('table_min_row field3');
      var max_row = get_Input('table_max_row field4');
      var form = $("#myForm");
      // Inputs should pass validation test before generating table
      if (form.valid() == true) {
        addTable(min_column, max_column, min_row, max_row, div);
      }
  }
  
  function addTable(min_column, max_column, min_row, max_row, id) {
      var dummy = min_column;
      var dummy2 = min_row;
      var r = min_row - 1;
      var c = min_column - 1;
      var arr = [];
      var column_length = findLength(min_column, max_column);
      var row_length = findLength(min_row, max_row);
  
      //Create 2-D arrays containing multiplication values
      for(var i = 0; i < row_length; i++) {
        arr[i] = []
        if(i == 0) {
          for(var j = 1; j < column_length; j++){
            arr[0][j] = dummy;
            dummy++;
          }
        }
        else {
          for(var j = 0; j < column_length; j++){
            if(j==0){
              arr[i][j] = dummy2;
              dummy2++
            }
            else {
              arr[i][j] = r * c;
            }
            c++;
          }
        }
        c=min_column-1;
        r++;
      }  
  
      // Generate table using HTML 
      var myTableDiv = id;
      var tableBody = document.createElement('table');
    
      for (var i = 0; i < row_length; i++) {
        var tr = document.createElement('tr');
        tableBody.appendChild(tr);
    
        for (var j = 0; j < column_length; j++) {
          var td = document.createElement('th');
          td.appendChild(document.createTextNode(arr[i][j]));
          tr.appendChild(td);
        }
      }
      myTableDiv.appendChild(tableBody);
    }
  
    // Find the length given two numbers
    function findLength(val1, val2){
      if (val1 < 0 && val2 > 0){
        return Math.abs(val1) + Math.abs(val2) + 2;
      }
      else {
         return Math.abs(Math.abs(val2) - Math.abs(val1)) + 2;
      }
    }
  
    // Custom Validation Method to check for integer input
    jQuery.validator.addMethod("integer", function(value, element){
      return this.optional(element) || /^[+-]?\d+$/.test(value);
    }, "Please Enter Whole Integer");
  
    // jQuery validate function
    $( "#myForm" ).validate({
      rules: {
        field1: {
          required: true,
          integer: true,
          min:-200,
          max: 200
        },
        field2: {
          required: true,
          integer: true
        },
        field3: {
          required: true,
          integer: true,
          min: -200,
          max: 200
        },
        field4: {
          required: true,
          integer: true
        }
      }
    });
  
    // Change the Min and Max rules based on what user input for Min and Max value
    $('[name=field1]').change(function()
    {
      var $input = $("[name=field2]");
      var value = get_Input("table_min_column field1")
      if(!(isNaN(value))){
        $input.rules("add", {min:value});
        $input.rules("add", {max:value + 200});
      }
    });
  
    $('[name=field3]').change(function()
    {
      var $input = $("[name=field4]");
      var value = get_Input("table_min_row field3")
      if(!(isNaN(value))){
        $input.rules("add", {min:value});
        $input.rules("add", {max:value + 200});
      }
    });

    $('[name=field2]').change(function()
    {
      var $input = $("[name=field1]");
      var value = get_Input("table_max_column field2")
      if(!(isNaN(value))){
        $input.rules("add", {min:value-200});
        $input.rules("add", {max:value});
      }
    });

    $('[name=field4]').change(function()
    {
      var $input = $("[name=field3]");
      var value = get_Input("table_max_row field4")
      if(!(isNaN(value))){
        $input.rules("add", {min:value-200});
        $input.rules("add", {max:value});
      }
    });

    // Create a slider with two-way binding feature
    function createSlider(formId,formSlider, formName, t){
      var f1 = formId;
      // jQuery plug in function
      $(formSlider).slider({
        min: -200, 
        max: 200, 
        step: 1,
        value: 0,
        // Two-way binding implementation
        slide: function( event, ui ) {
        var $input = $(formName);
        var value = ui.value;
        // Change Validation Min, Max Rule for slider
        if(!(isNaN(value))){
          if(formName === t){
            $input.rules("add", {min:value});
            $input.rules("add", {max:value + 200});
          }
          else {
            $input.rules("add", {min:value-200});
            $input.rules("add", {max:value});
          }
        }
          // Input field change based on slider
          $(f1).val(ui.value);
          // Dynamically create mult-table based on slider
          generate_Table("mult-table");
        }
    });
    
    // Slider change based on input field
    var initialValue = $(formSlider).slider("option", "value");
    $(f1).val(initialValue);
    $(f1).change(function() {
      var newVal = $(this).val();
        $(formSlider).slider("option", "value", newVal);
    }); 
  };

  
  $(function(){
  var d = document.getElementById("table_min_column field1");
  var s = document.getElementById("col_min_slider");
  var d2 = document.getElementById("table_max_column field2");
  var s2 = document.getElementById("col_max_slider");
  var d3 = document.getElementById("table_min_row field3");
  var s3 = document.getElementById("row_min_slider");
  var d4 = document.getElementById("table_max_row field4");
  var s4 = document.getElementById("row_max_slider");

  var n1 = document.getElementsByName("field1");
  var n2 = document.getElementsByName("field2");
  var n3 = document.getElementsByName("field3");
  var n4 = document.getElementsByName("field4");
  
  // Call createSlider function for each input form
  createSlider(d,s, n2, n2);
  createSlider(d2,s2, n1, n3);
  createSlider(d3,s3, n4, n4);
  createSlider(d4,s4, n3, n2);
  });

  // Global variables
  var tabs = $( "#tabs" ).tabs();
  var tabCounter = 1;
  var value = 1;
  var tabTemplate = "<li> <span class='ui-icon ui-icon-close'></span> <a href='#{href}'>#{label}</a> <label><input type='checkbox' class='choice' value=#{val}></label> </li>"
  var index = 0
  // Create a new tab that stored multiplication table
  function addTab() {
    var form = $("#myForm");
    if (form.valid() == true) {
      var col_min = get_Input("table_min_column field1");
      var col_max = get_Input("table_max_column field2");
      var row_min = get_Input("table_min_row field3");
      var row_max = get_Input("table_max_row field4");
      var label = col_min + " to " + col_max + " By " + row_min + " to " + row_max;
      var id = "tabs-" + tabCounter;
      var li = $(tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ).replace( /#\{val}/g, value) )
      tabs.find( ".ui-tabs-nav" ).append( li );
      tabs.append( "<div id='" + id + "'></div>" );
      tabs.tabs("refresh");
      tabCounter++;
      value++;
      generate_Table(id);
    }
  }

  // When click on close icon, tab will close
  tabs.on( "click", "span.ui-icon-close", function() {
    var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelId ).remove();
    tabs.tabs( "refresh" );
  });

  // Closed tab that has been selected 
  function deleteTab() {
    var form = $(".choice:checked");
    var form_val;

    for (var i = 0; i < form.length; i++) {
      form_val = form[i].value;
      $(".choice:checked").closest("li").remove().attr("aria-controls");
      $("#tabs-" + form_val).remove();
    }
    tabs.tabs("refresh");
  }

  // Default table and tab will be create
  window.onload = function(){
    generate_Table("mult-table");
    addTab();
    $( "#tabs" ).tabs({
      active:0
    })
  }


  
  
  