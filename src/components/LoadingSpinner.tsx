interface SpinnerProps {
    className: string
}

const LoadingSpinner: React.FC<SpinnerProps> = ({className }) => {
  return (
    <div className={` ${className} border-4 border-dashed rounded-full animate-spin`} ></div>      
  )
}

export default LoadingSpinner