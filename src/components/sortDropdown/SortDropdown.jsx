import Dropdown from 'react-bootstrap/Dropdown';

const SortDropdown = (props) => {

  function sortByPriceAsc() {
    props.setFilteredProducts([...props.filteredProducts].sort((a, b) => {return a.price - b.price}))
  }

  function sortByPriceDesc() {
    props.setFilteredProducts([...props.filteredProducts].sort((a, b) => {return b.price - a.price}))
  }

  function sortByDefault() {
    props.setFilteredProducts()
  }

  return (
    <Dropdown>
    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">Sort</Dropdown.Toggle>
    <Dropdown.Menu>
      {props.products ?
      <>
        <Dropdown.Item onClick={sortByPriceAsc}>Price: lowest</Dropdown.Item>
        <Dropdown.Item onClick={sortByPriceDesc}>Price: highest</Dropdown.Item>
        <Dropdown.Item onClick={sortByDefault}>Default</Dropdown.Item>
      </> : <p>loading</p>
      }
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default SortDropdown
