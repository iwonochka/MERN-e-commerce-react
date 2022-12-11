import Dropdown from 'react-bootstrap/Dropdown';

const SortDropdown = (props) => {
  
  function sortByPriceAsc() {
    props.setProducts([...props.products].sort((a, b) => {return a.price - b.price}))
  }

  function sortByPriceDesc() {
    props.setProducts([...props.products].sort((a, b) => {return b.price - a.price}))
  }

  function sortByDefault() {
    props.getAllProducts()
  }

  return (
    <Dropdown>
    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">Sort</Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item onClick={sortByPriceAsc}>Price: lowest</Dropdown.Item>
      <Dropdown.Item onClick={sortByPriceDesc}>Price: highest</Dropdown.Item>
      <Dropdown.Item onClick={sortByDefault}>Default</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default SortDropdown
