import { useContext, useState } from "react";
import SettingForm from "../../ui/SettingForm";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../../ui/Button";
import { SettingContext } from "../../page/Settings";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";
import DOMPurify from "dompurify";
import styled from "styled-components";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["link", "image"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const formatOption = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

const StyledSection = styled.div`
  max-height: 300px;
  overflow-y: auto;
  font-size: 50%;
  background-color: #ebebeb;
  padding: 1rem;
  border-radius: 5px;
`;

const StyledQuill = styled(ReactQuill)`
  /* background-color: red; */
  max-height: 40rem;
  overflow: scroll;
`;

const OtherForm = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [accommodationsRegulation, setAccommodationsRegulation] = useState("");
  const { settings, isLoading, isEditMode, setIsEditMode } = useContext(SettingContext);
  const { update, isLoading: isUpdating } = useUpdateSetting();
  console.log(settings);

  if (isLoading || isUpdating) return <Spinner />;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(privacyPolicy, accommodationsRegulation);
    const submitObject = { ...settings, privacyPolicy, accommodationsRegulation };
    console.log("最後提交物件", submitObject);
    update(submitObject);
    setIsEditMode(false);
  }

  function handlePrivacyPolicyOnChange(content, delta) {
    console.log("delta:", delta, "contents:", content);
    // console.log("e:", e, "value:", value, "contents:", content);
    setPrivacyPolicy(content);
  }

  function handleAccommodationsRegulationOnChange(content, delta) {
    console.log("delta:", delta, "contents:", content);
    setAccommodationsRegulation(content);
  }

  const renderPrivacyPolicyHtml = DOMPurify.sanitize(settings.privacyPolicy);
  const renderAccommodationsRegulationHtml = DOMPurify.sanitize(settings.accommodationsRegulation);

  return (
    <SettingForm>
      <SettingForm.RowTitle>隱私權政策</SettingForm.RowTitle>
      {!isEditMode ? (
        <StyledSection dangerouslySetInnerHTML={{ __html: renderPrivacyPolicyHtml }}></StyledSection>
      ) : (
        <StyledQuill
          theme="snow"
          // style={{ height: "250px", marginBottom: "5rem" }}
          modules={{ toolbar: toolbarOptions }}
          formats={formatOption}
          defaultValue={settings.privacyPolicy}
          onChange={(content, delta) => handlePrivacyPolicyOnChange(content, delta)}
        />
      )}

      <SettingForm.RowTitle>訂房須知</SettingForm.RowTitle>
      {!isEditMode ? (
        <StyledSection
          dangerouslySetInnerHTML={{ __html: renderAccommodationsRegulationHtml }}
        ></StyledSection>
      ) : (
        <ReactQuill
          theme="snow"
          // style={{ height: "250px", marginBottom: "5rem" }}
          modules={{ toolbar: toolbarOptions }}
          defaultValue={settings.accommodationsRegulation}
          onChange={(content, delta) => handleAccommodationsRegulationOnChange(content, delta)}
        />
      )}
      {isEditMode && (
        <SettingForm.Footer>
          <Button type="cancel">取消</Button>
          <Button type="confirm" onClick={(e) => handleSubmit(e)}>
            確認修改
          </Button>
        </SettingForm.Footer>
      )}
    </SettingForm>
  );
};

// （隱私權政策、訂房須知、相關網站icon與連結）OtherForm
export default OtherForm;
