# jQuery Stack

A jQuery plugin that provides a simple API for adding and/or removing rows from a container.

The need for this kind of activity often occurs when building a form for a model that `has_many` of some other model. It's convenient and intuitive for a user to be able to dynamically create or remove rows by which to include additional data. This is, of course, just one example. I'm sure there are others, but this is the one that most often occurs in my world.

The Stack plugin attempts to make no assumptions -- it's not entirely successful so far. See the **Features** section for more information about assumptions it does make -- about what you want to do or how you'd like to do it. Instead, it provides callbacks within which application-specific functionality can be executed.

## Features

* Provides a simple API for creating new rows by cloning an existing row.
* Uses the add/remove buttons of the UI design to maximize visual integration.
  * Assumption #1: Each row has an add and a remove button.
* Hides the remove button if only 1 row is displayed.
  * Assumption #2: You shouldn't be able to remove the only row of inputs since that's the row that makes everything work.
* Allows an optional limit on the number of rows that can be added.
* Lightweight (as well it should be -- it doesn't have to do much).

## Basic Usage

1. Load the jQuery and Stack plugin Javascript files somewhere on your page.
1. Identify the stack container.

        $( '.my-container' ).stack({ options });

## Options

<table cellpadding="5" border="1">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>addSelector</code></td>
      <td>string</td>
      <td><strong>Required.</strong> The selector expression that will identify the add button within a given row or container.</td>
    </tr>
    <tr>
      <td><code>rowElement</code></td>
      <td>string</td>
      <td><strong>Optional.</strong> The tag name that should be used to delimit a single row. Defaults to <code>fieldset</code>.</td>
    </tr>
    <tr>
      <td><code>rowClass</code></td>
      <td>string</td>
      <td><strong>Optional.</strong> The name of a class that should be applied to each row element. Defaults to <code>jqstackrow</code>.</td>
    </tr>
    <tr>
      <td><code>removeSelector</code></td>
      <td>string</td>
      <td><strong>Optional.</strong> The selector expression that will identify the add button within a given row or container. An empty value indicates that removal is not allowed once a row is added.</td>
    </tr>
    <tr>
      <td><code>maxRows</code></td>
      <td>string</td>
      <td><strong>Optional.</strong> The maximum number of rows that can be added to a given container.</td>
    </tr>
    <tr>
      <td><code>beforeAdd($row)</code></td>
      <td>function</td>
      <td><strong>Optional.</strong> Callback executed before a cloned row is appended to the container. A jQuery object representing the row that is about to be added is passed to the callback.</td>
    </tr>
    <tr>
      <td><code>afterAdd($row)</code></td>
      <td>function</td>
      <td><strong>Optional.</strong> Callback executed after a cloned row has been appended to the container. A jQuery object representing the row that was added is passed to the callback.</td>
    </tr>
    <tr>
      <td><code>beforeRemove($row)</code></td>
      <td>function</td>
      <td><strong>Optional.</strong> Callback executed before a row is removed from the container. A jQuery object representing the row that is about to be removed is passed to the callback.</td>
    </tr>
    <tr>
      <td><code>afterRemove($container)</code></td>
      <td>function</td>
      <td><strong>Optional.</strong> Callback executed after a row has been removed from the container. A jQuery object representing the container from which the row was removed is passed to the callback.</td>
    </tr>
  </tbody>
</table>

## Returns

The modified jQuery object suitable for chaining.

## License

This code is licensed under the MIT license.

## Notes

Feel free to suggest improvements in a ticket or fork this project and improve upon it yourself. Consider contributing your additions via pull request.
