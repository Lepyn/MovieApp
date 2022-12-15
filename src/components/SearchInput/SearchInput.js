import { Input } from 'antd'
import { useState, useCallback } from 'react'
import { debounce } from 'lodash'

const SearchInput = (props) => {
  return <Input className="search-input" maxLength={50} {...props} placeholder="type to search..." />
}

export default SearchInput
