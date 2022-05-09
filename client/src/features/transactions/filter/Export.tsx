import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

const Export: React.FC = () => {
  const fileExtTypes = ["txt", "csv", "json", "xlsx"]
  return (
    <DropdownButton id="dropdown-basic-button" align="end" title="Export button">
      {fileExtTypes.map((fileType) => (
        <Dropdown.Item key={fileType}>
          <i className={`bi-filetype-${fileType} me-2 fs-4`}></i>
          <span className="fs-6">Export as .{fileType}</span>
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}

export default Export
