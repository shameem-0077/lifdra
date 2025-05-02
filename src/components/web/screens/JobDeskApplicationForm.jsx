// import React, { useEffect } from "react";
// import styled from "styled-components";
// import WebHeader from "../inludes/general/steyp-landing-page/WebHeader";
// import Footer from "./steyp-landing-page/Footer";
// import { useState } from "react";
// import uploadImage from "../../../assets/images/job-desk/upload-clip.svg";
// import rounderArrowImage from "../../../assets/images/job-desk/rounded-arrow.svg";
// import CountrySelector from "../../learn/includes/authentication/general/CountrySelector";
// import { manageConfig } from "../../../axiosConfig";
// import RequestLoader from "../../learn/includes/authentication/general/RequestLoader";
// import JobDeskSuccessModal from "../inludes/general/steyp-landing-page/modal/JobDeskSuccessModal";
// import JobDeskOtpModal from "../inludes/general/steyp-landing-page/modal/JobDeskOtpModal";
// import { useRef } from "react";
// import { data } from "jquery";
// import { useHistory, useLocation } from "react-router-dom";
// import CollegeApplicationForm from "../inludes/jobdesk-applications/CollegeApplicationForm";
// import DropoutApplicationForm from "../inludes/jobdesk-applications/DropoutApplicationForm";

// export default function JobDeskApplicationForm() {
//   const [about, setAbout] = useState(false);

//   const history = useHistory();
//   const location = useLocation();
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [mail, setMail] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [gender, setGender] = useState("");

//   const [selectedForm, setSelectedForm] = useState("college");

//   const [employment, setEmployment] = useState("");
//   const [education, setEducation] = useState("");
//   const [college, setCollege] = useState("");
//   const [graduationYear, setGraduationYear] = useState("");
//   const [resumeName, setResumeName] = useState("");
//   const [resume, setResume] = useState("");
//   const [isDistrictModal, setDistrictModal] = useState(false);
//   const [isemploymentModal, setEmploymentModal] = useState(false);
//   const [countryselector, setCountryselector] = useState(false);
//   const [isError, setError] = useState(false);
//   const [isLoading, setLoading] = useState(false);
//   const [isSuccessModal, setSuccessModal] = useState(false);
//   const [isOtpModal, setOtpModal] = useState(false);
//   const today = new Date().getFullYear();
//   const [districtSelector, setDistrictSelector] = useState(false);
//   const [districtErrorMessage, setDistrictErrorMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   let referralCode = localStorage.getItem("referral_code");
//   referralCode = JSON.parse(referralCode);
//   let re =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//   const districts = [
//     {
//       id: 1,
//       name: "thiruvananthapuram",
//     },
//     {
//       id: 2,
//       name: "kollam",
//     },
//     {
//       id: 3,
//       name: "pathanamthitta",
//     },
//     {
//       id: 4,
//       name: "alappuzha",
//     },
//     {
//       id: 5,
//       name: "kottayam",
//     },
//     {
//       id: 6,
//       name: "idukki",
//     },
//     {
//       id: 7,
//       name: "ernakulam",
//     },
//     {
//       id: 8,
//       name: "thrissur",
//     },
//     {
//       id: 9,
//       name: "palakkad",
//     },
//     {
//       id: 10,
//       name: "malappuram",
//     },
//     {
//       id: 11,
//       name: "kozhikode",
//     },
//     {
//       id: 12,
//       name: "wayanad",
//     },
//     {
//       id: 13,
//       name: "kannur",
//     },
//     {
//       id: 14,
//       name: "kasargod",
//     },
//   ];

//   useEffect(() => {
//     setAbout(true);
//   }, [about]);
//   // const renderDistricts = () => {
//   //     return districts.map((district) => (
//   //         <SingleName
//   //             onClick={() => {
//   //                 // setDistrictModal(false)
//   //                 setDistrictName(district.name);
//   //             }}
//   //             className={
//   //                 districtName === district.name ? "selected-district" : ""
//   //             }
//   //         >
//   //             {district.name}
//   //         </SingleName>
//   //     ));
//   // };
//   // const renderSubmit = () => {
//   // 	setLoading(true);

//   // 	setError(true);
//   // 	const formData = new FormData();

//   // 	formData.append("name", name);
//   // 	formData.append("email", mail);
//   // 	formData.append("country", selectedCountry.web_code);
//   // 	formData.append("gender", gender);
//   // 	formData.append("educational_qualification", education);
//   // 	formData.append("year_of_graduation", graduationYear);
//   // 	formData.append("phone_number", mobile);
//   // 	formData.append("district", selectedDistrict);
//   // 	formData.append("employment_status", employment);
//   // 	formData.append("name_of_college", college);
//   // 	formData.append("resume", resume);
//   // 	formData.append("referral_code", referralCode && referralCode);

//   // 	// if (
//   // 	//     name !== "" &&
//   // 	//     selectedCountry !== {} &&
//   // 	//     gender !== "" &&
//   // 	//     (graduationYear >= 1980 && graduationYear <= today) === true &&
//   // 	//     education !== "" &&
//   // 	//     mobile !== "" &&
//   // 	//     selectedDistrict !== "" &&
//   // 	//     employment !== "" &&
//   // 	//     college !== "" &&
//   // 	//     re.test(mail) === true
//   // 	// ) {

//   // 	manageConfig
//   // 		.post(`web/job-desk/registration/`, formData)
//   // 		.then((response) => {
//   // 			const { StatusCode, data } = response.data;
//   // 			if (StatusCode === 6000) {
//   // 				window.localStorage.removeItem("referral_code");
//   // 				setLoading(false);
//   // 				setOtpModal(true);
//   // 				setError(false);
//   // 			} else if (StatusCode === 6001) {
//   // 				setErrorMessage(data.message);
//   // 				setLoading(false);
//   // 			}
//   // 		})
//   // 		.catch((error) => {
//   // 			setLoading(false);
//   // 		});
//   // };

//   // const uploadResume = (e) => {
//   // 	if (e.target.name === "resume") {
//   // 		if (e.target.files.length > 0) {
//   // 			setResume(e.target.files[0]);
//   // 			setResumeName(e.target.files[0].name);
//   // 		}
//   // 	}
//   // };

//   // const truncate = (str) => {
//   // 	if (str) {
//   // 		return str.length > 15 ? str.substring(25, 0) + "..." : str;
//   // 	}
//   // 	return " - ";
//   // };

//   // const handleShow = () => {
//   // 	setCountryselector((prevValue) => !prevValue);
//   // };

//   // const onSelectHandler = (selected) => {
//   // 	setSelectedCountry(selected);
//   // };

//   return (
//     <>
//       <WebHeader selectedForm={selectedForm} isSat about={about} />

//       <FormSection>
//         <CountrySelector
//           show={countryselector}
//           handleClick={handleShow}
//           onSelectHandler={onSelectHandler}
//           selectedCountry={selectedCountry}
//         />
//         <JobDeskSuccessModal
//           isSuccessModal={isSuccessModal}
//           setSuccessModal={setSuccessModal}
//           setName={setName}
//           setMail={setMail}
//           setGender={setGender}
//           setEducation={setEducation}
//           setGraduationYear={setGraduationYear}
//           setMobile={setMobile}
//           setSelectedDistrict={setSelectedDistrict}
//           setEmployment={setEmployment}
//           setCollege={setCollege}
//           setResume={setResume}
//         />
//         <JobDeskOtpModal
//           isOtpModal={isOtpModal}
//           setOtpModal={setOtpModal}
//           selectedCountry={selectedCountry}
//           mobile={mobile}
//           setSuccessModal={setSuccessModal}
//         />
//         <section className="wrapper">
//           <H5>
//             <b>Job Desk</b>
//             <br />
//             Application Form
//           </H5>
//           <Form>
//             <InputDiv>
//               <TextInput
//                 type="text"
//                 placeholder="Enter name"
//                 id="name"
//                 value={name}
//                 onChange={(e) => {
//                   setName(e.target.value);
//                 }}
//               />
//               <Label for="name">First Name*</Label>
//               <ErrorMessage
//                 className={
//                   isError === true && name === "" ? "error-active" : ""
//                 }
//               >
//                 This field is required
//               </ErrorMessage>
//             </InputDiv>
//             <NumberDiv>
//               <Flag onClick={() => setCountryselector(!countryselector)}>
//                 <img src={selectedCountry.flag} alt={selectedCountry.name} />
//               </Flag>
//               <CountryArrow
//                 onClick={() => setCountryselector(!countryselector)}
//               >
//                 <img
//                   src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/down-arrow.svg"
//                   alt="Arrow"
//                 />
//               </CountryArrow>
//               <Code>{selectedCountry.phone_code}</Code>
//               <NumberInput
//                 type="number"
//                 placeholder="Enter phone number"
//                 id="number"
//                 value={mobile}
//                 onChange={(e) => {
//                   setMobile(e.target.value);
//                 }}
//               />
//               <Label for="number">Phone Number*</Label>
//               <ErrorMessage
//                 className={
//                   isError === true && mobile === "" ? "error-active" : ""
//                 }
//               >
//                 This field is required
//               </ErrorMessage>
//             </NumberDiv>
//             <InputDiv>
//               <TextInput
//                 type="email"
//                 placeholder="Enter email"
//                 id="mail"
//                 value={mail}
//                 onChange={(e) => {
//                   setMail(e.target.value);
//                 }}
//               />
//               <Label for="mail">Email address*</Label>
//               <ErrorMessage
//                 className={
//                   isError === true && re.test(mail) === false
//                     ? "error-active"
//                     : ""
//                 }
//               >
//                 Valid mail is required
//               </ErrorMessage>
//             </InputDiv>
//             <District
//               className={selectedDistrict !== "" ? "district" : ""}
//               onClick={() => setDistrictModal(!isDistrictModal)}
//             >
//               <DistrictDiv onClick={() => setDistrictSelector(true)}>
//                 <Label>District *</Label>
//                 {selectedDistrict !== "" ? selectedDistrict : "Choose District"}
//                 <Arrow className={isDistrictModal ? "active" : ""}>
//                   <img
//                     src={
//                       "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/down-arrow.svg"
//                     }
//                     alt="Down Arrow"
//                   />
//                 </Arrow>
//                 {districtErrorMessage !== "" ? (
//                   <p className="invalid">{districtErrorMessage}</p>
//                 ) : (
//                   ""
//                 )}
//               </DistrictDiv>
//               <ModalContainer
//                 className={districtSelector && isDistrictModal ? "active" : ""}
//               >
//                 <SubContainer>
//                   <List>
//                     {districts.map((district) => (
//                       <DisctrictContainer
//                         key={district.id}
//                         onClick={() => {
//                           setSelectedDistrict(district.name);
//                           setDistrictSelector(false);
//                         }}
//                         className={
//                           selectedDistrict === district.name ? "active" : ""
//                         }
//                       >
//                         {district.name}
//                         {selectedDistrict === district.name ? (
//                           <Checked src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-checked.svg" />
//                         ) : (
//                           ""
//                         )}
//                       </DisctrictContainer>
//                     ))}
//                   </List>
//                 </SubContainer>
//               </ModalContainer>
//             </District>
//             <GenderDiv>
//               <Gender
//                 onClick={() => {
//                   setGender("male");
//                 }}
//               >
//                 <BorderDiv>
//                   <BgDiv
//                     className={gender === "male" ? "gender-active" : ""}
//                   ></BgDiv>
//                 </BorderDiv>
//                 Male
//               </Gender>
//               <Gender
//                 onClick={(e) => {
//                   setGender("female");
//                 }}
//               >
//                 <BorderDiv>
//                   <BgDiv
//                     className={gender === "female" ? "gender-active" : ""}
//                   ></BgDiv>
//                 </BorderDiv>
//                 Female
//               </Gender>
//               <Gender
//                 onClick={(e) => {
//                   setGender("other");
//                 }}
//               >
//                 <BorderDiv>
//                   <BgDiv
//                     className={gender === "other" ? "gender-active" : ""}
//                   ></BgDiv>
//                 </BorderDiv>
//                 Other
//               </Gender>
//               <Label for="gender">Gender*</Label>
//               <ErrorMessage
//                 className={
//                   isError === true && gender === "" ? "error-active" : ""
//                 }
//               >
//                 This field is required
//               </ErrorMessage>
//             </GenderDiv>
//             <FlexDiv onClick={() => setEmploymentModal(!isemploymentModal)}>
//               {employment === "" ? (
//                 "Select your status"
//               ) : (
//                 <p className="emp">{employment}</p>
//               )}
//               <Arrow className={isemploymentModal ? "modal-active" : ""}>
//                 <img
//                   src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/down-arrow.svg"
//                   alt="Arrow"
//                 />
//               </Arrow>
//               <Label for="employ">Employment Status*</Label>
//               <ErrorMessage
//                 className={
//                   isError === true && employment === "" ? "error-active" : ""
//                 }
//               >
//                 This field is required
//               </ErrorMessage>
//               <EmploymentContainer
//                 className={isemploymentModal ? "employment-modal-active" : ""}
//               >
//                 <SingleName
//                   onClick={() => setEmployment("student")}
//                   className={employment === "student" ? "active" : ""}
//                 >
//                   <Detail className={employment === "student" ? "active" : ""}>
//                     {" "}
//                     Student
//                   </Detail>
//                   {employment === "student" ? (
//                     <Checked src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-checked.svg" />
//                   ) : (
//                     ""
//                   )}
//                 </SingleName>
//                 <SingleName
//                   onClick={() => setEmployment("graduate")}
//                   className={employment === "graduate" ? "active" : ""}
//                 >
//                   <Detail className={employment === "graduate" ? "active" : ""}>
//                     Graduate
//                   </Detail>
//                   {employment === "graduate" ? (
//                     <Checked src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-checked.svg" />
//                   ) : (
//                     ""
//                   )}
//                 </SingleName>
//                 <SingleName
//                   onClick={() => setEmployment("drop_out")}
//                   className={employment === "drop_out" ? "active" : ""}
//                 >
//                   <Detail className={employment === "drop_out" ? "active" : ""}>
//                     Drop Out
//                   </Detail>
//                   {employment === "drop_out" ? (
//                     <Checked src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-checked.svg" />
//                   ) : (
//                     ""
//                   )}
//                 </SingleName>
//                 <SingleName
//                   onClick={() => setEmployment("employee")}
//                   className={employment === "employee" ? "active" : ""}
//                 >
//                   <Detail className={employment === "employee" ? "active" : ""}>
//                     Employee
//                   </Detail>
//                   {employment === "employee" ? (
//                     <Checked src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-checked.svg" />
//                   ) : (
//                     ""
//                   )}
//                 </SingleName>
//               </EmploymentContainer>
//             </FlexDiv>
//             <InputDiv>
//               <TextInput
//                 type="text"
//                 placeholder="Enter your educational qualification"
//                 id="education"
//                 value={education}
//                 onChange={(e) => {
//                   setEducation(e.target.value);
//                 }}
//               />
//               <Label for="education">Educational qualification*</Label>
//               <ErrorMessage
//                 className={
//                   isError === true && education === "" ? "error-active" : ""
//                 }
//               >
//                 This field is required
//               </ErrorMessage>
//             </InputDiv>
//             <InputDiv>
//               <TextInput
//                 type="text"
//                 placeholder="Enter the name of college"
//                 id="college"
//                 value={college}
//                 onChange={(e) => {
//                   setCollege(e.target.value);
//                 }}
//               />
//               <Label for="college">Name of College*</Label>
//               <ErrorMessage
//                 className={
//                   isError === true && college === "" ? "error-active" : ""
//                 }
//               >
//                 This field is required
//               </ErrorMessage>
//             </InputDiv>
//             <InputDiv>
//               <TextInput
//                 type="number"
//                 placeholder="Y Y Y Y"
//                 id="year"
//                 maxlength="4"
//                 value={graduationYear}
//                 onChange={(e) => {
//                   setGraduationYear(e.target.value);
//                 }}
//               />
//               <Label for="year">Year of Graduation*</Label>
//               <ErrorMessage
//                 className={
//                   isError === true &&
//                   (graduationYear >= 1980 && graduationYear <= today) === false
//                     ? "error-active"
//                     : ""
//                 }
//               >
//                 Enter a valid year
//               </ErrorMessage>
//             </InputDiv>
//             <FlexDiv className="upload">
//               <FileInput
//                 type="file"
//                 name="resume"
//                 placeholder="Upload  "
//                 id="resume"
//                 accept="application/pdf, image/jpeg, image/png "
//                 onChange={(e) => uploadResume(e)}
//               />
//               <Label for="resume">Resume</Label>
//               <ErrorMessage
//                 className={
//                   isError === true && resume === "" ? "error-active" : ""
//                 }
//               ></ErrorMessage>

//               {resumeName === "" ? (
//                 "Upload resume (optional)"
//               ) : (
//                 <FileName>{truncate(resumeName)}</FileName>
//               )}
//               <Upload>
//                 <img src={uploadImage} alt="Upload" />
//               </Upload>
//             </FlexDiv>
//             {errorMessage === "Already applied" ? <P>{errorMessage} </P> : null}

//             <Submit onClick={renderSubmit}>
//               {isLoading ? <RequestLoader /> : "Submit"}
//             </Submit>
//           </Form>
//         </section>
//       </FormSection>

//       <Footer />
//     </>
//   );
// }

// const P = styled.p`
//   color: red;
//   font-size: 16px;
//   text-align: right;
// `;
// const FormSection = styled.section`
//   padding: 150px 00px 100px;
//   background-color: #f9f9f9;
//   & .wrapper {
//     padding: 0 50px;
//     @media all and (max-width: 980px) {
//       padding: 0;
//     }
//   }
//   @media all and (max-width: 480px) {
//     padding: 100px 0 50px;
//   }
//   @media all and (max-width: 1280px) {
//   }
// `;
// const H5 = styled.h5`
//   font-size: 32px;
//   text-align: center;
//   position: relative;
//   width: fit-content;
//   margin: 0 auto 50px;

//   &::before {
//     content: "";
//     background-image: url(${rounderArrowImage});
//     background-repeat: no-repeat;
//     width: 70px;
//     height: 70px;
//     position: absolute;
//     right: -20px;
//     bottom: 10px;
//     @media all and (max-width: 640px) {
//       width: 70px;
//       height: 60px;
//     }
//     @media all and (max-width: 480px) {
//       right: -30px;
//       bottom: 10px;
//     }
//   }

//   & b {
//     color: #0fa76f;
//     font-size: 34px;
//     @media all and (max-width: 640px) {
//       font-size: 30px;
//     }
//     @media all and (max-width: 480px) {
//       font-size: 28px;
//     }
//   }

//   @media all and (max-width: 640px) {
//     font-size: 28px;
//   }
//   @media all and (max-width: 480px) {
//     font-size: 26px;
//   }
// `;
// const Form = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: stretch;
//   flex-wrap: wrap;

//   & input::placeholder {
//     font-family: "gordita_regular";
//   }
// `;
// const InputDiv = styled.div`
//   width: 48%;
//   background-color: #fff;
//   position: relative;
//   margin-bottom: 50px;
//   border-radius: 10px;
//   height: 65px;

//   @media all and (max-width: 640px) {
//     width: 100%;
//     height: 55px;
//   }
//   @media all and (max-width: 480px) {
//     margin-bottom: 40px;
//   }
// `;
// const TextInput = styled.input`
//   border: 2px solid #e6e6e6;
//   border-radius: 10px !important;
//   font-size: 16px;
//   width: 100%;
//   height: 100%;
//   padding: 15px;
//   font-family: "gordita_regular";
//   &:focus {
//     border: 2px solid #0fa76f;
//     border-radius: 10px;
//   }
//   &:hover {
//     border: 2px solid #0fa76f;
//     border-radius: 10px;
//   }
//   @media all and (max-width: 640px) {
//     font-size: 15px;
//   }
//   @media all and (max-width: 360px) {
//     font-size: 14px;
//     border: 1px solid #e6e6e6;
//     &:hover {
//       border: 1px solid #0fa76f;
//       border-radius: 10px;
//     }
//   }
// `;
// const NumberInput = styled.input`
//   width: calc(100% - 100px);
//   height: 100%;
//   font-size: 16px;
//   font-family: "gordita_Regular";

//   @media all and (max-width: 640px) {
//     font-size: 15px;
//   }
//   @media all and (max-width: 360px) {
//     font-size: 14px;
//   }
// `;
// const Label = styled.label`
//   position: absolute;
//   top: -30px;
//   left: 0;
//   font-size: 15px;
//   color: #a0a0a0;
//   margin-bottom: 10px;

//   @media all and (max-width: 480px) {
//     font-size: 14px;
//   }
// `;
// const NumberDiv = styled.div`
//   display: flex;
//   position: relative;
//   align-items: center;
//   border: 2px solid #e6e6e6;
//   border-radius: 10px !important;
//   background-color: #fff;
//   width: 48%;
//   height: 65px;
//   padding: 15px;
//   margin-bottom: 50px;
//   &:focus-within {
//     border: 2px solid #0fa76f;
//   }
//   &:hover {
//     border: 2px solid #0fa76f;
//     border-radius: 10px;
//   }

//   @media all and (max-width: 640px) {
//     width: 100%;
//     height: 55px;
//   }
//   @media all and (max-width: 480px) {
//     margin-bottom: 40px;
//   }
//   @media all and (max-width: 360px) {
//     font-size: 14px;
//     border: 1px solid #e6e6e6;
//     &:hover {
//       border: 1px solid #0fa76f;
//       border-radius: 10px;
//     }
//   }
// `;
// const Flag = styled.div`
//   width: 25px;
//   height: 25px;
//   border-radius: 50%;
//   overflow: hidden;
//   margin-right: 10px;
//   cursor: pointer;
//   & img {
//     width: 100%;
//     display: block;
//     object-fit: cover;
//     height: 100%;
//   }
// `;
// const CountryArrow = styled.div`
//   width: 8px;
//   transform: rotate(90deg);
//   margin-right: 10px;
//   cursor: pointer;
//   & img {
//     width: 100%;
//     display: block;
//   }
//   @media all and (max-width: 360px) {
//     width: 7px;
//   }
// `;
// const Code = styled.span`
//   font-size: 16px;
//   margin-right: 10px;
// `;
// const FlexDiv = styled.div`
//   position: relative;
//   width: 48%;
//   height: 65px;
//   background-color: #fff;
//   position: relative;
//   margin-bottom: 50px;
//   border-radius: 10px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 15px 20px 15px 15px;
//   border: 2px solid #e6e6e6;
//   font-size: 16px;
//   cursor: pointer;
//   color: #a0a0a0;

//   &:hover {
//     border: 2px solid #0fa76f;
//     border-radius: 10px;
//   }

//   & .emp {
//     color: #000;
//   }

//   &.upload {
//     @media all and (max-width: 640px) {
//       margin-bottom: 30px;
//       width: 100%;
//       height: 55px;
//     }
//   }

//   @media all and (max-width: 640px) {
//     font-size: 15px;
//     width: 100%;
//     height: 55px;
//   }
//   @media all and (max-width: 480px) {
//     margin-bottom: 40px;
//   }
//   @media all and (max-width: 360px) {
//     font-size: 14px;
//     border: 1px solid #e6e6e6;
//     &:hover {
//       border: 1px solid #0fa76f;
//       border-radius: 10px;
//     }
//   }
// `;
// const GenderDiv = styled.div`
//   width: 48%;
//   background-color: #fff;
//   position: relative;
//   margin-bottom: 50px;
//   border-radius: 10px;
//   display: flex;
//   align-items: center;
//   height: 65px;
//   padding: 15px;
//   border: 2px solid #e6e6e6;
//   font-size: 16px;

//   &:hover {
//     border: 2px solid #0fa76f;
//     border-radius: 10px;
//   }

//   @media all and (max-width: 640px) {
//     font-size: 15px;
//     width: 100%;
//     height: 55px;
//   }
//   @media all and (max-width: 480px) {
//     margin-bottom: 40px;
//   }
//   @media all and (max-width: 360px) {
//     font-size: 14px;
//     border: 1px solid #e6e6e6;
//     &:hover {
//       border: 1px solid #0fa76f;
//       border-radius: 10px;
//     }
//   }
// `;
// const Gender = styled.div`
//   display: flex;
//   margin-right: 20px;
//   justify-content: center;
//   cursor: pointer;
//   font-size: 16px;
//   align-items: center;
//   :nth-child(3) {
//     margin: 0px;
//   }

//   @media all and (max-width: 768px) {
//     font-size: 15px;
//     margin-right: 15px;
//   }
// `;
// const BorderDiv = styled.div`
//   width: 20px;
//   height: 20px;
//   border: 2px solid #5aa970;
//   border-radius: 50%;
//   margin-right: 10px;
//   padding: 2px;
//   margin-bottom: 5px;

//   @media all and (max-width: 980px) {
//     width: 15px;
//     height: 15px;
//     margin-right: 6px;
//   }
// `;
// const BgDiv = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: #5aa970;
//   border-radius: 50%;
//   transform: scale(0);
//   transition: all 0.4s ease;

//   &.gender-active {
//     transform: scale(1);
//   }
// `;
// const Arrow = styled.div`
//   width: 8px;
//   transform: rotate(90deg);
//   transition: all 0.4s ease;

//   & img {
//     width: 100%;
//     display: block;
//   }

//   &.modal-active {
//     transform: rotate(-90deg);
//   }
//   &.active {
//     transform: rotate(-90deg);
//   }
// `;
// const FileInput = styled.input`
//   font-family: "gordita_regular";
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   opacity: 0;
//   cursor: pointer;
//   font-size: 16px;
// `;
// const Upload = styled.div`
//   width: 30px;
//   height: 30px;
//   & img {
//     width: 100%;
//     display: block;
//   }
// `;
// const Submit = styled.div`
//   background-color: #5aa970;
//   width: 48%;
//   margin-left: auto;
//   margin-right: 0;
//   padding: 15px;
//   border-radius: 10px;
//   text-align: center;
//   color: #fff;
//   font-size: 16px;
//   font-family: "gordita_medium";
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 50px;
//   @media all and (max-width: 640px) {
//     font-size: 15px;
//   }
//   @media all and (max-width: 480px) {
//     font-size: 14px;
//     margin: 0 auto;
//   }
// `;
// const DistrictContainer = styled.div`
//   position: absolute;
//   bottom: -152px;
//   left: 0;
//   width: 100%;
//   transform: scaleY(0);
//   transform-origin: top;
//   transition: all 0.4s ease;
//   background-color: #fff;
//   height: 150px;
//   max-height: 150px;
//   z-index: 1;
//   overflow-y: scroll;
//   border: 2px solid #e6e6e6;
//   border-top: none;
//   border-radius: 10px;
//   padding: 20px 0;

//   &.disctrict-modal-active {
//     transform: scaleY(1);
//   }
// `;
// const SingleName = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 10px 12px;
//   cursor: pointer;
//   color: #000;
//   font-family: gordita_regular;
//   @media all and (max-width: 360px) {
//     font-size: 14px;
//   }
//   &.active {
//     background-color: #f0fff4;
//   }
//   :hover {
//     background-color: #f0fff4;
//   }
// `;
// const Detail = styled.p`
//   font-size: 15px;
//   color: #000;
//   &.active {
//     color: #5aa970;
//   }
// `;
// const EmploymentContainer = styled.div`
//   position: absolute;
//   bottom: -152px;
//   left: 0;
//   width: 100%;
//   transform: scaleY(0);
//   transform-origin: top;
//   transition: all 0.4s ease;
//   background-color: #fff;
//   height: 150px;
//   max-height: 150px;
//   z-index: 1;
//   overflow-y: scroll;
//   border: 2px solid #e6e6e6;
//   border-top: none;
//   border-radius: 10px;

//   &.employment-modal-active {
//     transform: scaleY(1);
//   }
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;
// const FileName = styled.p`
//   font-size: 15px;

//   @media all and (max-width: 660px) {
//     font-size: 14px;
//   }
//   @media all and (max-width: 640px) {
//     font-size: 15px;
//   }
// `;
// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 12px;
//   display: none;
//   text-align: right;
//   position: absolute;
//   bottom: -22px;
//   right: 0;

//   &.error-active {
//     display: block;
//   }
// `;
// const District = styled.div`
//   margin-bottom: 50px;
//   border-radius: 10px;
//   height: 65px;
//   background: #fff;
//   border: 2px solid #d9d9d9;
//   position: relative;
//   width: 48%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   cursor: pointer;
//   color: #9e9e9e;
//   font-size: 16px;
//   padding: 0 15px;
//   font-family: "gordita_regular";
//   &.district {
//     color: #000;
//   }
//   &:hover {
//     border: 2px solid #0fa76f;
//   }
//   @media all and (max-width: 1280px) {
//     max-height: 55px;
//     width: 100%;
//     min-height: 55px;
//   }

//   @media all and (max-width: 980px) {
//     width: 48%;
//   }
//   @media all and (max-width: 768px) {
//     width: 100%;
//   }

//   @media all and (max-width: 480px) {
//     width: 100%;
//     margin-bottom: 50px;
//     padding: 15px;
//   }
//   @media all and (max-width: 360px) {
//     font-size: 14px;
//     border: 1px solid #e6e6e6;
//     &:hover {
//       border: 1px solid #0fa76f;
//       border-radius: 10px;
//     }
//   }
// `;
// const DistrictDiv = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   height: 100%;
// `;
// const ModalContainer = styled.div`
//   position: absolute;
//   top: 54px;
//   left: 0;
//   width: 100%;
//   z-index: 111;
//   transform: scaleY(0);
//   transform-origin: top;
//   transition: all 0.4s ease;

//   &.active {
//     transform: scaleY(1);
//   }
// `;
// const SubContainer = styled.div`
//   background: rgb(255 255 255);
//   border: 1px solid #e1e1e1;
//   border-radius: 7px;
//   padding: 0px;
//   overflow-y: scroll;
//   border-radius: 8px;
//   height: 200px;
//   /* transform: scaleY(0);
//     transform-origin: top;
//     transition: all 0.4s ease;

//     &.active {
//         transform: scaleY(1);
//     } */
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;
// const List = styled.div``;
// const DisctrictContainer = styled.div`
//   text-transform: capitalize;
//   display: flex;
//   justify-content: space-between;
//   padding: 10px 12px;
//   cursor: pointer;
//   color: #000;
//   font-family: gordita_regular;

//   &.active {
//     color: rgb(66, 200, 112);
//     background-color: #f0fff4;
//   }
//   :hover {
//     background-color: #f0fff4;
//   }
//   @media all and (max-width: 480px) {
//     font-size: 15px;
//   }
// `;
// const Checked = styled.img`
//   width: 17px;
// `;
// const Message = styled.p`
//   color: red;
//   font-size: 12px;
// `;

import React, { useEffect } from "react";
import styled from "styled-components";
import WebHeader from "../inludes/general/steyp-landing-page/WebHeader";
import Footer from "./steyp-landing-page/Footer";
import { useState } from "react";
import uploadImage from "../../../assets/images/job-desk/upload-clip.svg";
import rounderArrowImage from "../../../assets/images/job-desk/rounded-arrow.svg";
import CountrySelector from "../../learn/includes/authentication/general/CountrySelector";
import { manageConfig } from "../../../axiosConfig";
import RequestLoader from "../../learn/includes/authentication/general/RequestLoader";
import JobDeskSuccessModal from "../inludes/general/steyp-landing-page/modal/JobDeskSuccessModal";
import JobDeskOtpModal from "../inludes/general/steyp-landing-page/modal/JobDeskOtpModal";
import { useRef } from "react";
import { data } from "jquery";
import { useHistory, useLocation } from "react-router-dom";
import CollegeApplicationForm from "../inludes/jobdesk-applications/CollegeApplicationForm";
import DropoutApplicationForm from "../inludes/jobdesk-applications/DropoutApplicationForm";

export default function JobDeskApplicationForm() {
    const [about, setAbout] = useState(false);

    const history = useHistory();
    const location = useLocation();
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [mail, setMail] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [gender, setGender] = useState("");

    const [selectedForm, setSelectedForm] = useState("college");

    const [employment, setEmployment] = useState("");
    const [education, setEducation] = useState("");
    const [college, setCollege] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [resumeName, setResumeName] = useState("");
    const [resume, setResume] = useState("");
    const [isDistrictModal, setDistrictModal] = useState(false);
    const [isemploymentModal, setEmploymentModal] = useState(false);
    const [countryselector, setCountryselector] = useState(false);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isSuccessModal, setSuccessModal] = useState(false);
    const [isOtpModal, setOtpModal] = useState(false);
    const today = new Date().getFullYear();
    const [districtSelector, setDistrictSelector] = useState(false);
    const [districtErrorMessage, setDistrictErrorMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let referralCode = localStorage.getItem("referral_code");
    referralCode = JSON.parse(referralCode);
    let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const districts = [
        {
            id: 1,
            name: "thiruvananthapuram",
        },
        {
            id: 2,
            name: "kollam",
        },
        {
            id: 3,
            name: "pathanamthitta",
        },
        {
            id: 4,
            name: "alappuzha",
        },
        {
            id: 5,
            name: "kottayam",
        },
        {
            id: 6,
            name: "idukki",
        },
        {
            id: 7,
            name: "ernakulam",
        },
        {
            id: 8,
            name: "thrissur",
        },
        {
            id: 9,
            name: "palakkad",
        },
        {
            id: 10,
            name: "malappuram",
        },
        {
            id: 11,
            name: "kozhikode",
        },
        {
            id: 12,
            name: "wayanad",
        },
        {
            id: 13,
            name: "kannur",
        },
        {
            id: 14,
            name: "kasargod",
        },
    ];

    useEffect(() => {
        setAbout(true);
    }, [about]);
    // const renderDistricts = () => {
    //     return districts.map((district) => (
    //         <SingleName
    //             onClick={() => {
    //                 // setDistrictModal(false)
    //                 setDistrictName(district.name);
    //             }}
    //             className={
    //                 districtName === district.name ? "selected-district" : ""
    //             }
    //         >
    //             {district.name}
    //         </SingleName>
    //     ));
    // };
    // const renderSubmit = () => {
    // 	setLoading(true);

    // 	setError(true);
    // 	const formData = new FormData();

    // 	formData.append("name", name);
    // 	formData.append("email", mail);
    // 	formData.append("country", selectedCountry.web_code);
    // 	formData.append("gender", gender);
    // 	formData.append("educational_qualification", education);
    // 	formData.append("year_of_graduation", graduationYear);
    // 	formData.append("phone_number", mobile);
    // 	formData.append("district", selectedDistrict);
    // 	formData.append("employment_status", employment);
    // 	formData.append("name_of_college", college);
    // 	formData.append("resume", resume);
    // 	formData.append("referral_code", referralCode && referralCode);

    // 	// if (
    // 	//     name !== "" &&
    // 	//     selectedCountry !== {} &&
    // 	//     gender !== "" &&
    // 	//     (graduationYear >= 1980 && graduationYear <= today) === true &&
    // 	//     education !== "" &&
    // 	//     mobile !== "" &&
    // 	//     selectedDistrict !== "" &&
    // 	//     employment !== "" &&
    // 	//     college !== "" &&
    // 	//     re.test(mail) === true
    // 	// ) {

    // 	manageConfig
    // 		.post(`web/job-desk/registration/`, formData)
    // 		.then((response) => {
    // 			const { StatusCode, data } = response.data;
    // 			if (StatusCode === 6000) {
    // 				window.localStorage.removeItem("referral_code");
    // 				setLoading(false);
    // 				setOtpModal(true);
    // 				setError(false);
    // 			} else if (StatusCode === 6001) {
    // 				setErrorMessage(data.message);
    // 				setLoading(false);
    // 			}
    // 		})
    // 		.catch((error) => {
    // 			setLoading(false);
    // 		});
    // };

    // const uploadResume = (e) => {
    // 	if (e.target.name === "resume") {
    // 		if (e.target.files.length > 0) {
    // 			setResume(e.target.files[0]);
    // 			setResumeName(e.target.files[0].name);
    // 		}
    // 	}
    // };

    // const truncate = (str) => {
    // 	if (str) {
    // 		return str.length > 15 ? str.substring(25, 0) + "..." : str;
    // 	}
    // 	return " - ";
    // };

    // const handleShow = () => {
    // 	setCountryselector((prevValue) => !prevValue);
    // };

    // const onSelectHandler = (selected) => {
    // 	setSelectedCountry(selected);
    // };

    return (
        <>
            <WebHeader selectedForm={selectedForm} isSat about={about} />

            <FormSection>
                {/* {selectedForm === "college" ? (
					<CollegeApplicationForm setSelectedForm={setSelectedForm} />
				) : selectedForm === "graduates" ? (
					<DropoutApplicationForm setSelectedForm={setSelectedForm} />
				) : null} */}
            </FormSection>

            <Footer />
        </>
    );
}

const P = styled.p`
    color: red;
    font-size: 16px;
    text-align: right;
`;
const FormSection = styled.section`
    padding: 150px 00px 100px;
    background-color: #f9f9f9;
    & .wrapper {
        padding: 0 50px;
        @media all and (max-width: 980px) {
            padding: 0;
        }
    }
    @media all and (max-width: 480px) {
        padding: 100px 0 50px;
    }
    @media all and (max-width: 1280px) {
    }
`;
const H5 = styled.h5`
    font-size: 32px;
    text-align: center;
    position: relative;
    width: fit-content;
    margin: 0 auto 50px;

    &::before {
        content: "";
        background-image: url(${rounderArrowImage});
        background-repeat: no-repeat;
        width: 70px;
        height: 70px;
        position: absolute;
        right: -20px;
        bottom: 10px;
        @media all and (max-width: 640px) {
            width: 70px;
            height: 60px;
        }
        @media all and (max-width: 480px) {
            right: -30px;
            bottom: 10px;
        }
    }

    & b {
        color: #0fa76f;
        font-size: 34px;
        @media all and (max-width: 640px) {
            font-size: 30px;
        }
        @media all and (max-width: 480px) {
            font-size: 28px;
        }
    }

    @media all and (max-width: 640px) {
        font-size: 28px;
    }
    @media all and (max-width: 480px) {
        font-size: 26px;
    }
`;
const Form = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;

    & input::placeholder {
        font-family: "gordita_regular";
    }
`;
const InputDiv = styled.div`
    width: 48%;
    background-color: #fff;
    position: relative;
    margin-bottom: 50px;
    border-radius: 10px;
    height: 65px;

    @media all and (max-width: 640px) {
        width: 100%;
        height: 55px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 40px;
    }
`;
const TextInput = styled.input`
    border: 2px solid #e6e6e6;
    border-radius: 10px !important;
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 15px;
    font-family: "gordita_regular";
    &:focus {
        border: 2px solid #0fa76f;
        border-radius: 10px;
    }
    &:hover {
        border: 2px solid #0fa76f;
        border-radius: 10px;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
        border: 1px solid #e6e6e6;
        &:hover {
            border: 1px solid #0fa76f;
            border-radius: 10px;
        }
    }
`;
const NumberInput = styled.input`
    width: calc(100% - 100px);
    height: 100%;
    font-size: 16px;
    font-family: "gordita_Regular";

    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
    }
`;
const Label = styled.label`
    position: absolute;
    top: -30px;
    left: 0;
    font-size: 15px;
    color: #a0a0a0;
    margin-bottom: 10px;

    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;
const NumberDiv = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    border: 2px solid #e6e6e6;
    border-radius: 10px !important;
    background-color: #fff;
    width: 48%;
    height: 65px;
    padding: 15px;
    margin-bottom: 50px;
    &:focus-within {
        border: 2px solid #0fa76f;
    }
    &:hover {
        border: 2px solid #0fa76f;
        border-radius: 10px;
    }

    @media all and (max-width: 640px) {
        width: 100%;
        height: 55px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
        border: 1px solid #e6e6e6;
        &:hover {
            border: 1px solid #0fa76f;
            border-radius: 10px;
        }
    }
`;
const Flag = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    cursor: pointer;
    & img {
        width: 100%;
        display: block;
        object-fit: cover;
        height: 100%;
    }
`;
const CountryArrow = styled.div`
    width: 8px;
    transform: rotate(90deg);
    margin-right: 10px;
    cursor: pointer;
    & img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 360px) {
        width: 7px;
    }
`;
const Code = styled.span`
    font-size: 16px;
    margin-right: 10px;
`;
const FlexDiv = styled.div`
    position: relative;
    width: 48%;
    height: 65px;
    background-color: #fff;
    position: relative;
    margin-bottom: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 15px 15px;
    border: 2px solid #e6e6e6;
    font-size: 16px;
    cursor: pointer;
    color: #a0a0a0;

    &:hover {
        border: 2px solid #0fa76f;
        border-radius: 10px;
    }

    & .emp {
        color: #000;
    }

    &.upload {
        @media all and (max-width: 640px) {
            margin-bottom: 30px;
            width: 100%;
            height: 55px;
        }
    }

    @media all and (max-width: 640px) {
        font-size: 15px;
        width: 100%;
        height: 55px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
        border: 1px solid #e6e6e6;
        &:hover {
            border: 1px solid #0fa76f;
            border-radius: 10px;
        }
    }
`;
const GenderDiv = styled.div`
    width: 48%;
    background-color: #fff;
    position: relative;
    margin-bottom: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 65px;
    padding: 15px;
    border: 2px solid #e6e6e6;
    font-size: 16px;

    &:hover {
        border: 2px solid #0fa76f;
        border-radius: 10px;
    }

    @media all and (max-width: 640px) {
        font-size: 15px;
        width: 100%;
        height: 55px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
        border: 1px solid #e6e6e6;
        &:hover {
            border: 1px solid #0fa76f;
            border-radius: 10px;
        }
    }
`;
const Gender = styled.div`
    display: flex;
    margin-right: 20px;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    align-items: center;
    :nth-child(3) {
        margin: 0px;
    }

    @media all and (max-width: 768px) {
        font-size: 15px;
        margin-right: 15px;
    }
`;
const BorderDiv = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid #5aa970;
    border-radius: 50%;
    margin-right: 10px;
    padding: 2px;
    margin-bottom: 5px;

    @media all and (max-width: 980px) {
        width: 15px;
        height: 15px;
        margin-right: 6px;
    }
`;
const BgDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: #5aa970;
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.4s ease;

    &.gender-active {
        transform: scale(1);
    }
`;
const Arrow = styled.div`
    width: 8px;
    transform: rotate(90deg);
    transition: all 0.4s ease;

    & img {
        width: 100%;
        display: block;
    }

    &.modal-active {
        transform: rotate(-90deg);
    }
    &.active {
        transform: rotate(-90deg);
    }
`;
const FileInput = styled.input`
    font-family: "gordita_regular";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    font-size: 16px;
`;
const Upload = styled.div`
    width: 30px;
    height: 30px;
    & img {
        width: 100%;
        display: block;
    }
`;
const Submit = styled.div`
    background-color: #5aa970;
    width: 48%;
    margin-left: auto;
    margin-right: 0;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-family: "gordita_medium";
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin: 0 auto;
    }
`;
const DistrictContainer = styled.div`
    position: absolute;
    bottom: -152px;
    left: 0;
    width: 100%;
    transform: scaleY(0);
    transform-origin: top;
    transition: all 0.4s ease;
    background-color: #fff;
    height: 150px;
    max-height: 150px;
    z-index: 1;
    overflow-y: scroll;
    border: 2px solid #e6e6e6;
    border-top: none;
    border-radius: 10px;
    padding: 20px 0;

    &.disctrict-modal-active {
        transform: scaleY(1);
    }
`;
const SingleName = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    cursor: pointer;
    color: #000;
    font-family: gordita_regular;
    @media all and (max-width: 360px) {
        font-size: 14px;
    }
    &.active {
        background-color: #f0fff4;
    }
    :hover {
        background-color: #f0fff4;
    }
`;
const Detail = styled.p`
    font-size: 15px;
    color: #000;
    &.active {
        color: #5aa970;
    }
`;
const EmploymentContainer = styled.div`
    position: absolute;
    bottom: -152px;
    left: 0;
    width: 100%;
    transform: scaleY(0);
    transform-origin: top;
    transition: all 0.4s ease;
    background-color: #fff;
    height: 150px;
    max-height: 150px;
    z-index: 1;
    overflow-y: scroll;
    border: 2px solid #e6e6e6;
    border-top: none;
    border-radius: 10px;

    &.employment-modal-active {
        transform: scaleY(1);
    }
    &::-webkit-scrollbar {
        display: none;
    }
`;
const FileName = styled.p`
    font-size: 15px;

    @media all and (max-width: 660px) {
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
`;
const ErrorMessage = styled.p`
    color: red;
    font-size: 12px;
    display: none;
    text-align: right;
    position: absolute;
    bottom: -22px;
    right: 0;

    &.error-active {
        display: block;
    }
`;
const District = styled.div`
    margin-bottom: 50px;
    border-radius: 10px;
    height: 65px;
    background: #fff;
    border: 2px solid #d9d9d9;
    position: relative;
    width: 48%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #9e9e9e;
    font-size: 16px;
    padding: 0 15px;
    font-family: "gordita_regular";
    &.district {
        color: #000;
    }
    &:hover {
        border: 2px solid #0fa76f;
    }
    @media all and (max-width: 1280px) {
        max-height: 55px;
        width: 100%;
        min-height: 55px;
    }

    @media all and (max-width: 980px) {
        width: 48%;
    }
    @media all and (max-width: 768px) {
        width: 100%;
    }

    @media all and (max-width: 480px) {
        width: 100%;
        margin-bottom: 50px;
        padding: 15px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
        border: 1px solid #e6e6e6;
        &:hover {
            border: 1px solid #0fa76f;
            border-radius: 10px;
        }
    }
`;
const DistrictDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`;
const ModalContainer = styled.div`
    position: absolute;
    top: 54px;
    left: 0;
    width: 100%;
    z-index: 111;
    transform: scaleY(0);
    transform-origin: top;
    transition: all 0.4s ease;

    &.active {
        transform: scaleY(1);
    }
`;
const SubContainer = styled.div`
    background: rgb(255 255 255);
    border: 1px solid #e1e1e1;
    border-radius: 7px;
    padding: 0px;
    overflow-y: scroll;
    border-radius: 8px;
    height: 200px;
    /* transform: scaleY(0);
    transform-origin: top;
    transition: all 0.4s ease;

    &.active {
        transform: scaleY(1);
    } */
    &::-webkit-scrollbar {
        display: none;
    }
`;
const List = styled.div``;
const DisctrictContainer = styled.div`
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    cursor: pointer;
    color: #000;
    font-family: gordita_regular;

    &.active {
        color: rgb(66, 200, 112);
        background-color: #f0fff4;
    }
    :hover {
        background-color: #f0fff4;
    }
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;
const Checked = styled.img`
    width: 17px;
`;
const Message = styled.p`
    color: red;
    font-size: 12px;
`;
