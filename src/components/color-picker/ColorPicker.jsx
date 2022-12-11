

const ColorPicker = (props) => {
  console.log(props.colors)
  return (
    <>
    {props.colors && props.colors.map((color) => (
      <div className="form-check-inline">
        <input style={color === "white" ? {backgroundColor: "whitesmoke"} : {backgroundColor: color}} name={color} type="checkbox" value={color} id="inline-checkbox-1" className="form-check-input" aria-label={color} onChange={(e) => props.handleColors(e)}/>
      </div>
    ))}
    </>
  )
}

export default ColorPicker
