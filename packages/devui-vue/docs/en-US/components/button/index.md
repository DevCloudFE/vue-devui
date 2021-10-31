# Button

The button is used to start an instant operation。

### When to use

An operation command (or a group of encapsulation) is marked, and the corresponding business logic is triggered in response to the user's click behavior。

### Main button

<d-button id="primaryBtn" style="margin-right: 8px">Primary</d-button>
<d-button :disabled="true">Disabled</d-button>

```html
<d-button id="primaryBtn" style="margin-right: 8px">Primary</d-button>
<d-button :disabled="true">Disabled</d-button>
```

### Secondary button

<d-button bsStyle="common" style="margin-right: 8px">Common</d-button>
<d-button bsStyle="common" :disabled="true">Disabled</d-button>

```html
<d-button bsStyle="common" style="margin-right: 8px">Common</d-button>
<d-button bsStyle="common" :disabled="true">Disabled</d-button>
```