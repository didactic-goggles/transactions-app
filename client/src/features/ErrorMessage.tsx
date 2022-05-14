import Alert from "react-bootstrap/Alert"

type ErrorMessageProps = {
  error: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { error } = props
  return <Alert variant="danger">{error}</Alert>
}

export default ErrorMessage
