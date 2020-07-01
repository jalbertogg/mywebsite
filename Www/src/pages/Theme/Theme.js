import './styles'
import React from 'react';
import { hot } from 'react-hot-loader/root'
import BigFooter from '../../components/BigFooter'
import {
  Form,
  FormGroup,
  Select,
  SelectItem,
  TextArea,
  TextInput,
  Button,
  Checkbox,
  ClickableTile,
  RadioButton,
  RadioButtonGroup,
  Link,
  Toggle,
  Tabs,
  Tab
  } from "carbon-components-react"

const Theme = () => {
  return ([
    <div className='bx--grid theme'>
      <Tabs>
        <Tab
          href="#"
          id="tab-1"
          label="Tab label 1"
        >
          <div className="some-content">
            Content for first tab goes here.
          </div>
        </Tab>
        <Tab
          href="#"
          id="tab-2"
          label="Tab label 2"
        >
          <div className="some-content">
            Content for second tab goes here.
          </div>
        </Tab>
        <Tab
          href="#"
          id="tab-3"
          label='Tab label 3'
        >
          <div className="some-content">
            Content for third tab goes here.
          </div>
        </Tab>
      </Tabs>

      <ClickableTile
        href='#'
      >
        <h1>Title</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <Link href="#">This is a Link in a Tile</Link>
      </ClickableTile>

      <Link href="#">This is a Link</Link>

      <Form className="form_buttons">
        <FormGroup
        legendText="Buttons styles"
        >
          <Button
          className="some-class"
          disabled={false}
          iconDescription="Button icon"
          kind="primary"
          onClick={function noRefCheck(){}}
          onFocus={function noRefCheck(){}}
          renderIcon={undefined}
          size="default"
          tabIndex={0}
          type="button"
        >
          Primary Button
        </Button>

        <Button
        className="some-class"
        disabled={false}
        iconDescription="Button icon"
        kind="secondary"
        onClick={function noRefCheck(){}}
        onFocus={function noRefCheck(){}}
        renderIcon={undefined}
        size="default"
        tabIndex={0}
        type="button"
        >
          Secondary Button
        </Button>

        <Button
        className="some-class"
        disabled={false}
        iconDescription="Button icon"
        kind="danger"
        onClick={function noRefCheck(){}}
        onFocus={function noRefCheck(){}}
        renderIcon={undefined}
        size="default"
        tabIndex={0}
        type="button"
        >
        Danger Button
        </Button>

        <Button
        className="some-class"
        disabled={false}
        iconDescription="Button icon"
        kind="ghost"
        onClick={function noRefCheck(){}}
        onFocus={function noRefCheck(){}}
        renderIcon={undefined}
        size="default"
        tabIndex={0}
        type="button"
        >
        Ghost Button
        </Button>

        <Button
        className="some-class"
        disabled={false}
        iconDescription="Button icon"
        kind="tertiary"
        onClick={function noRefCheck(){}}
        onFocus={function noRefCheck(){}}
        renderIcon={undefined}
        size="default"
        tabIndex={0}
        type="button"
        >
        Tertiary Button
        </Button>
        </FormGroup>
      </Form>


    <Toggle
      aria-label="toggle button"
      defaultToggled
      id="toggle-1"
      labelText="Toggle button"
    />

    <Form>
      <FormGroup>
        <TextInput
          helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
          id="test2"
          invalidText="Invalid error message."
          labelText="Text Input label"
          placeholder="Placeholder text"
        />
      </FormGroup>
      <FormGroup>
      <TextArea
        cols={50}
        helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
        id="test5"
        invalidText="Invalid error message."
        labelText="Text Area label"
        placeholder="Placeholder text"
        rows={4}
      />
      </FormGroup>
      <FormGroup>
        <Select
          defaultValue="placeholder-item"
          id="select-1"
          invalidText="This is an invalid error message."
          labelText="Select"
        >
          <SelectItem
            text="Option 1"
            value="option-1"
          />
          <SelectItem
            text="Option 2"
            value="option-2"
          />
          <SelectItem
            text="Option 3"
            value="option-3"
          />
        </Select>
      </FormGroup>
      <FormGroup
        legendText="Radio Button heading"
      >
        <RadioButtonGroup
          defaultSelected="default-selected"
          legend="Group Legend"
          name="radio-button-group"
          valueSelected="default-selected"
        >
          <RadioButton
            id="radio-1"
            labelText="Radio button label"
            value="standard"
          />
          <RadioButton
            id="radio-2"
            labelText="Radio button label"
            value="default-selected"
          />
          <RadioButton
            id="radio-3"
            labelText="Radio button label"
            value="disabled"
          />
        </RadioButtonGroup>
      </FormGroup>
      <FormGroup>
        <fieldset className="bx--fieldset">
          <legend className="bx--label">Checkbox heading</legend>
          <Checkbox defaultChecked labelText="Checkbox label" id="checked" />
        </fieldset>
      </FormGroup>
      <Button
        kind="primary"
        tabIndex={0}
        type="submit"
      >
        Submit
      </Button>
    </Form>
  </div>,
  <BigFooter />
  ]);
};

export default hot(Theme);
