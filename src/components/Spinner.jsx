import { Oval } from  'react-loader-spinner'

const Spinner = () => {
  return (
    <div>
      <Oval
        height={40}
        width={40}
        color="#222222"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#ffeec4"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  )
}

export default Spinner
