/*=========================================================================================
    File Name: app-invoice.js
    Description: app-invoice Javascripts
    ----------------------------------------------------------------------------------------
    Item Name: Frest HTML Admin Template
   Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(document).ready(function() {
    
    /********Invoice View ********/
    // ---------------------------
    // init date picker
    if ($(".pickadate").length) {
      $(".pickadate").pickadate({
        format: "mm/dd/yyyy"
      });
    }
  
    /********Invoice List ********/
    // ---------------------------
  
    // init data table
    if ($(".invoice-data-table").length) {
      var dataListView = $(".invoice-data-table").DataTable({
        columnDefs: [
          {
            targets: 0,
            className: "control"
          },
          {
            orderable: true,
            targets: 1,
            checkboxes: { selectRow: true }
          },
          {
            targets: [0, 1],
            orderable: false
          },
        ],
        order: [2, 'asc'],
        dom:
          '<"top d-flex flex-wrap"<"action-filters flex-grow-1"f><"actions action-btns d-flex align-items-center">><"clear">rt<"bottom"p>',
        language: {
          search: "",
          searchPlaceholder: "Search Users"
        },
        select: {
          style: "multi",
          selector: "td:first-child",
          items: "row"
        },
        responsive: {
          details: {
            type: "column",
            target: 0
          }
        }
      });
    }
  
    // To append actions dropdown inside action-btn div
    var invoiceFilterAction = $(".invoice-filter-action");
    var invoiceOptions = $(".invoice-options");
    $(".action-btns").append(invoiceFilterAction, invoiceOptions);
  
    // add class in row if checkbox checked
    $(".dt-checkboxes-cell")
      .find("input")
      .on("change", function() {
        var $this = $(this);
        if ($this.is(":checked")) {
          $this.closest("tr").addClass("selected-row-bg");
        } else {
          $this.closest("tr").removeClass("selected-row-bg");
        }
      });
    // Select all checkbox
    $(document).on("change", ".dt-checkboxes-select-all input", function() {
      if ($(this).is(":checked")) {
        $(".dt-checkboxes-cell")
          .find("input")
          .prop("checked", this.checked)
          .closest("tr")
          .addClass("selected-row-bg");
      } else {
        $(".dt-checkboxes-cell")
          .find("input")
          .prop("checked", "")
          .closest("tr")
          .removeClass("selected-row-bg");
      }
    });
  
    // ********Invoice Edit***********//
    // --------------------------------
    // form repeater jquery
    if ($(".invoice-item-repeater").length) {
      $(".invoice-item-repeater").repeater({
        show: function() {
          $(this).slideDown();
        },
        hide: function(deleteElement) {
          $(this).slideUp(deleteElement);
        }
      });
    }
  });
  