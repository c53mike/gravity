/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { space, color } from 'shared/system';

class InputSearch extends React.Component {

  constructor(props) {
    super(props);
    this.debouncedNotify = debounce(() => {
      this.props.onChange(this.state.value);
    }, 200);

    let value = props.value || '';

    this.state = {
      value,
      isFocused: false,
    };
  }

  onBlur = () => {
    this.setState({ isFocused: false });
  }

  onFocus = () => {
    this.setState({ isFocused: true });
  }

  onChange = e => {
    this.setState({ value: e.target.value });
    this.debouncedNotify();
  }

  componentDidMount() {
    // set cursor
    const $input = ReactDOM.findDOMNode(this);
    if ($input) {
      const length = $input.value.length;
      $input.selectionEnd = length;
      $input.selectionStart = length;
    }
  }

  render() {
    const { autoFocus = false, ...rest } = this.props;
    return (
      <Input placeholder="SEARCH..."
        px="3"
        bg="primary.dark"
        color="text.primary"
        {...rest}
        autoFocus={autoFocus}
        value={this.state.value}
        onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
    );
  }
}


function fromTheme(props){
  return {
    '&:focus, &:active': {
      background: props.theme.colors.light,
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, .24)',
      color: props.theme.colors.text.onLight,
    },
    '&::placeholder': {
      color: props.theme.colors.subtle,
      fontSize: props.theme.fontSizes[1],
    }
  }
}

const Input = styled.input`
  box-sizing: border-box;
  min-width: 200px;
  outline: none;
  border: none;
  border-radius: 200px;
  height: 40px;
  ${fromTheme}
  ${space}
  ${color}
`

export default InputSearch;