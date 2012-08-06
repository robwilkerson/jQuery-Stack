/**
 * Stack Plugin for jQuery
 * (c) 2012 Rob Wilkerson. Free software released under MIT License.
 */

// Attach Stack as a jQuery plugin
jQuery.fn.stack = function( opts ) {
  this.each( function() {
    jQuery.stack.init( this, opts );
  });

  return this;
};

// Put the stack in its own namespace
jQuery.stack = function() {
  // Provide a closure so we can always access the stack itself
  var stack = this;

  this.opts = {};
  this.init = function( el, opts ) {
    var $el = jQuery( el );
    var config = jQuery.extend({
        // Properties
        rowElement     : 'fieldset', // A tag name
        rowClass       : 'jqstackrow', // Class name
        addSelector    : null, // Button to add a row
        removeSelector : null, // Button to remove a row
        maxRows        : null, // Defaults to no maximum number of added rows
        // Callback functions
        beforeAdd      : null, // Callback executed before a row is added
        afterAdd       : null, // Callback executed after a row is added
        beforeRemove   : null, // Callback executed before a row is removed
        afterRemove    : null // Callback executed after a row is removed
      },
      stack.opts,
      opts
    );
    config.rowSelector = config.rowElement + '.' + config.rowClass;

    // Wrap the existing content of the stackable element in a "stacked" element
    // If, of course, it's not already wrapped
    if( !$el.find( config.rowSelector ).length ) {
      $el.children().wrapAll( '<' + config.rowElement + ' class="' + config.rowClass + '" />' );
    }

    // Attach event handlers to buttons
    $el.on( 'click', config.addSelector, function( e ) {
      e.preventDefault();

      var $this = $( this );
      var $template = cloneRow();

      // Dutifully call any beforeAdd callback
      if( typeof( config.beforeAdd ) === 'function' ) {
        config.beforeAdd( $template );
      }

      $el.append( $template );
      setButtons();

      // Dutifully call any afterAdd callback
      if( typeof( config.afterAdd ) === 'function' ) {
        config.afterAdd( $template );
      }
    });

    if( config.removeSelector && $( config.removeSelector.length ) ) {
      $el.on( 'click', config.removeSelector, function( e ) {
        e.preventDefault();
        
        var $this = $( this );
        var $row = $this.closest( config.rowSelector );

        // Dutifully call any beforeRemove callback
        if( typeof( config.beforeRemove ) === 'function' ) {
          config.beforeRemove( $row );
        }

        $row.remove();
        setButtons();

        // Dutifully call any afterRemove callback
        if( typeof( config.afterRemove ) === 'function' ) {
          config.afterRemove( $el );
        }
      });
    }

    // Clone the first row (presumably it's the one we should be copying)
    function cloneRow() {
      return $( config.rowSelector, $el ).first().clone( true );
    }

    // Set the buttons.
    // - If there's only 1 row, it can't be removed. The remove button will be
    //   hidden.
    function setButtons() {
      var $rows = $( config.rowSelector, $el );

      if( config.removeSelector && $( config.removeSelector.length ) ) {
        if( $rows.length === 1 ) {
          $( config.removeSelector, $el ).hide();
        }
        else {
          $( config.removeSelector, $el ).show();
        }
      }
    }

    setButtons();
  };

  return this;
}();
