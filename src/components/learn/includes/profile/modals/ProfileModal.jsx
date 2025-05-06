import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { serverConfig } from "../../../../../axiosConfig";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Lottie from "react-lottie";
import animationData from "../../../../../assets/lotties/modal/tick.json";
import loadingAnimationData from "../../../../../assets/lotties/modal/loading_lottie.json";

function ProfileModal() {
	const user_profile = useSelector((state) => state.user_profile);
	const { isProfileModel, profileModalType } = useSelector((state) => state);
	const dispatch = useDispatch();
	const user_data = useSelector((state) => state.user_data);
	const [selectedDate, handleDateChange] = useState(
		new Date(user_profile.dob)
	);
	const [selectedCategory, setSelectedCategory] = useState(
		user_profile.student_category
	);
	const [selectedGender, setSelectedGender] = useState(user_profile.gender);
	const [selectedEmail, setSelectedEmail] = useState("");
	const [selectedName, setSelectedName] = useState(
		user_profile.name ? user_profile.name : ""
	);

	const [selectedOTP, setSelectedOTP] = useState("");
	const [isError, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [dateOfBirth, setDateOfBirth] = useState("");
	const today = new Date().toLocaleDateString();
	// console.log("today", today);
	const [successMessage, setSuccessMessage] = useState("");
	const [isLoading, setLoading] = useState(false);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		setSelectedGender(user_profile.gender);
		setSelectedCategory(user_profile.student_category);
	}, [isProfileModel]);

	function convert(str) {
		var date = new Date(str),
			mnth = ("0" + (date.getMonth() + 1)).slice(-2),
			day = ("0" + date.getDate()).slice(-2);
		return [date.getFullYear(), mnth, day].join("-");
	}

	useEffect(() => {
		setDateOfBirth(convert(selectedDate));
	}, [selectedDate]);

	function formatDate(input) {
		if (input) {
			var datePart = input.match(/\d+/g),
				year = datePart[0], // get only two digits
				month = datePart[1],
				day = datePart[2];

			return day + "-" + month + "-" + year;
		}
	}
	const handleClose = () => {
		setEdit(false);
		setError(false);
		setDateOfBirth(user_profile.dob);
		setSelectedEmail("");
		dispatch({
			type: "TOGGLE_PROFILE_MODAL",
		});
	};

	const [category] = useState([
		{
			id: 1,
			title: "School Student",
			description: "Student studying in a class between 3rd and 12th",
			type: "School",
		},
		{
			id: 2,
			title: "College Student",
			description: "Student pursuing UG/PG",
			type: "Campus",
		},
		{
			id: 3,
			title: "Other",
			description: "Graduate / Drop out",
			type: "Graduates",
		},
	]);

	const [gender] = useState([
		{
			id: 1,
			title: "Male",
			icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/male.svg",

			type: "male",
		},
		{
			id: 2,
			title: "Female",
			icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/female.svg",
			type: "female",
		},
		{
			id: 3,
			title: "Rater not say",
			icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/other.svg",
			type: "others",
		},
	]);

	const updateCategory = () => {
		let { access_token } = user_data;
		if (user_profile.student_category === selectedCategory) {
			setError(true);
			setErrorMessage("Category already selected");
		} else {
			setLoading(true);
			accountsConfig
				.post(
					`api/v1/users/update-student-category/`,
					{ student_category: selectedCategory },
					{
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					}
				)
				.then((res) => {
					let { StatusCode } = res.data;
					if (StatusCode === 6000) {
						setSuccessMessage(
							"You have successfully updated your Student category"
						);
						setLoading(false);
						dispatch({
							type: "UPDATE_USER_PROFILE",
							user_profile: {
								...user_profile,
								student_category: selectedCategory,
							},
						});
						dispatch({
							type: "UPDATE_PROFILE_MODAL",
							profileModalType: "success",
						});

						setError(false);
					} else {
						setLoading(false);
						setError(true);
					}
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
					setError(true);
				});
		}
	};

	const updateGender = () => {
		let { access_token } = user_data;
		if (user_profile.gender === selectedGender) {
			setError(true);
			setErrorMessage("Gender already selected");
			console.log("error ");
		} else {
			setLoading(true);
			accountsConfig
				.post(
					`api/v1/users/update-gender/`,
					{ gender: selectedGender },
					{
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					}
				)
				.then((res) => {
					let { StatusCode } = res.data;
					if (StatusCode === 6000) {
						setLoading(false);
						setSuccessMessage(
							"You have successfully updated your Gender"
						);
						dispatch({
							type: "UPDATE_USER_PROFILE",
							user_profile: {
								...user_profile,
								gender: selectedGender,
							},
						});
						dispatch({
							type: "UPDATE_PROFILE_MODAL",
							profileModalType: "success",
						});
						setError(false);
					} else {
						setError(true);
						setLoading(false);
					}
				})
				.catch((err) => {
					setLoading(false);
					setError(true);
					console.log(err);
				});
		}
	};
	const updateEmail = () => {
		let { access_token } = user_data;
		if (
			/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(selectedEmail) &&
			selectedEmail.includes(".com")
		) {
			// setError(false);
			// setErrorMessage("");

			if (user_profile.email === selectedEmail) {
				setError(true);
				setErrorMessage("address already exists");
				console.log("error ");
			} else {
				setLoading(true);
				accountsConfig
					.post(
						`/api/v1/users/set-email/`,
						{ email: selectedEmail },
						{
							headers: {
								Authorization: `Bearer ${access_token}`,
							},
						}
					)
					.then((res) => {
						let { StatusCode } = res.data;
						if (StatusCode === 6000) {
							setSuccessMessage(
								"You have successfully updated your Email"
							);
							dispatch({
								type: "UPDATE_USER_PROFILE",
								user_profile: {
									...user_profile,
									email: selectedEmail,
								},
							});
							dispatch({
								type: "UPDATE_PROFILE_MODAL",
								profileModalType: "otp",
							});
							setError(false);

							setLoading(false);
						} else {
							setError(true);
							setLoading(false);
						}
					})
					.catch((err) => {
						console.log(err);
						setError(true);
						setLoading(false);
					});
			}
		} else {
			setError(true);
			setErrorMessage("Enter a valid Email");
		}
	};

	const updateName = () => {
		let { access_token } = user_data;
		setLoading(true);
		accountsConfig
			.post(
				`/api/v1/users/update-name/`,
				{ name: selectedName },
				{
					headers: {
						Authorization: "Bearer " + access_token,
					},
				}
			)
			.then((response) => {
				const { StatusCode, data } = response.data;
				let { message } = data;
				if (StatusCode === 6000) {
					setSuccessMessage(
						"You have successfully updated your name"
					);
					dispatch({
						type: "UPDATE_USER_PROFILE",
						user_profile: {
							...user_profile,
							name: selectedName,
						},
					});
					dispatch({
						type: "UPDATE_PROFILE_MODAL",
						profileModalType: "success",
					});
					setError(false);

					setLoading(false);
				} else {
					setError(true);
					setErrorMessage(message);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
				setError(true);
				setLoading(false);
			});
	};

	const updateEmailOTP = () => {
		let { access_token } = user_data;
		if (!selectedOTP) {
			setError(true);
			setErrorMessage("Enter your otp");
			console.log("error ");
		}
		setLoading(true);
		accountsConfig
			.post(
				`/api/v1/users/verify-email/`,
				{ otp: selectedOTP },
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			)
			.then((res) => {
				let { StatusCode, data } = res.data;
				if (StatusCode === 6000) {
					setSuccessMessage(
						"You have successfully updated your email"
					);
					dispatch({
						type: "UPDATE_USER_PROFILE",
						user_profile: {
							...user_profile,
							email: selectedEmail,
						},
					});
					dispatch({
						type: "UPDATE_PROFILE_MODAL",
						profileModalType: "success",
					});
					setError(false);

					setLoading(false);
				} else if (StatusCode === 6001) {
					setError(true);
					setErrorMessage(data.message);
					setLoading(false);
				}
			})
			.catch((err) => {
				console.log(err);
				setError(true);
				setLoading(false);
			});
	};
	const updateDoB = () => {
		let { access_token } = user_data;
		if (user_profile.dob === dateOfBirth) {
			setError(true);
			setErrorMessage("Date of Birth already exists");
			console.log("error ");
		} else {
			setLoading(true);
			accountsConfig
				.post(
					`api/v1/users/update-dob/`,
					{ dob: dateOfBirth },
					{
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					}
				)
				.then((res) => {
					let { StatusCode } = res.data;
					if (StatusCode === 6000) {
						setSuccessMessage(
							"You have successfully updated your Date of birth"
						);
						dispatch({
							type: "UPDATE_USER_PROFILE",
							user_profile: {
								...user_profile,
								dob: dateOfBirth,
							},
						});
						dispatch({
							type: "UPDATE_PROFILE_MODAL",
							profileModalType: "success",
						});
						setError(false);

						setLoading(false);
					} else {
						setError(true);
						setLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
					setError(true);
					setLoading(false);
				});
		}
	};

	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {},
	};
	const LoaderOptions = {
		loop: true,
		autoplay: true,
		animationData: loadingAnimationData,
		rendererSettings: {},
	};

	const handleOTPChange = (e) => {
		setSelectedOTP(e.target.value);
		setError(false);
	};
	const handleChange = (e) => {
		let str = e.target.value;
		setSelectedEmail(e.target.value);
		setError(false);
		setErrorMessage("");

		// if (
		// 	/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(str) &&
		// 	str.includes(".com")
		// ) {
		// } else {
		// 	setError(true);
		// 	setErrorMessage("Enter a valid Email");
		// }
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			switch (profileModalType) {
				case "gender":
					updateGender();
					break;
				case "name":
					updateName();
					break;
				case "student_category":
					updateCategory();
					break;
				case "email":
					updateEmail();
					break;
				case "date_of_birth":
					updateDoB();
					break;
				case "sucess":
					handleClose();
					break;
				case "otp":
					updateEmailOTP();
					break;
				default:
					break;
			}
		}
	};

	const changeName = (e) => {
		let c_value = e.target.value;
		let n_value = c_value.replace(/[^A-Za-z, " "]/gi, "");
		setSelectedName(n_value);
	};

	return (
		<Container>
			<BackContainer
				style={{ transform: isProfileModel && "scale(1,1)" }}
			>
				{" "}
				<Overlay onClick={handleClose}></Overlay>
				{profileModalType === "student_category" ? (
					<Modal>
						<Cover>
							<Title>
								{user_profile?.student_category
									? "Edit Category"
									: "Add Category"}
							</Title>
							<Description>
								We can provide you certificate with this
								selected category.
							</Description>
							<Categories>
								{category.map((data) => (
									<CategoryCard
										key={data.id}
										className={
											selectedCategory === data.type &&
											"active"
										}
										onClick={() =>
											setSelectedCategory(data.type)
										}
									>
										<h3>{data.title}</h3>
										<p>{data.description}</p>
										<img
											src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/tick.svg
                                            "
											alt=""
										/>
									</CategoryCard>
								))}
								{isError && (
									<ErrorMessage>{errorMessage}</ErrorMessage>
								)}
							</Categories>

							<ButtonContainer>
								<Button onClick={handleClose}>Cancel</Button>

								{isLoading ? (
									<Button className="save">
										<Lottie
											options={LoaderOptions}
											height={"100%"}
											width={"100%"}
										/>
									</Button>
								) : (
									<Button
										className="save"
										onClick={updateCategory}
									>
										Save
									</Button>
								)}
							</ButtonContainer>
						</Cover>
					</Modal>
				) : profileModalType === "gender" ? (
					<Modal>
						<Cover>
							<Title>
								{user_profile.gender
									? "Edit Gender"
									: "Add Gender"}
							</Title>
							<Description>
								We can provide you the certificate with the
								selected gender
							</Description>
							<Gender>
								{gender.map((data) => (
									<GenderCard
										onClick={() =>
											setSelectedGender(data.type)
										}
										className={
											selectedGender === data.type &&
											"active"
										}
									>
										<h3>{data.title}</h3>
										<Icon src={data.icon} alt="" />
										<Tick
											className={
												selectedGender === data.type &&
												"active"
											}
											src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/tick.svg
                                            "
											alt=""
										/>
									</GenderCard>
								))}
								{isError && (
									<ErrorMessage>{errorMessage}</ErrorMessage>
								)}
							</Gender>
							<ButtonContainer>
								<Button onClick={handleClose}>Cancel</Button>
								{isLoading ? (
									<Button className="save">
										<Lottie
											options={LoaderOptions}
											height={"100%"}
											width={"100%"}
										/>
									</Button>
								) : (
									<Button
										className="save"
										onClick={updateGender}
									>
										Save
									</Button>
								)}
							</ButtonContainer>
						</Cover>
					</Modal>
				) : profileModalType === "email" ? (
					<Modal>
						<Cover>
							<Title>
								{user_profile.email
									? "Edit Email"
									: "Add Email"}
							</Title>
							<Description>
								We can provide you the certificate with the
								selected email.
							</Description>
							<EmailCover>
								<img
									src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/mail-icon.svg
                                    "
									alt=""
								/>
								<Email
									type="email"
									onKeyDown={handleKeyDown}
									value={
										selectedEmail
										// ? selectedEmail
										// : user_profile.email
										// ? user_profile.email
										// : null
									}
									placeholder={
										// user_profile.email
										//     ? user_profile.email
										//     : "sample@gmail.com"
										"Email Address"
									}
									onChange={(e) => handleChange(e)}
								/>
								{isError && (
									<ErrorMessage>{errorMessage}</ErrorMessage>
								)}
							</EmailCover>

							<ButtonContainer>
								<Button onClick={handleClose}>Cancel</Button>

								<Button
									className="save"
									onClick={(e) => {
										isError
											? e.preventDefault()
											: updateEmail();
									}}
									type={isError ? "notvalid" : "valid"}
								>
									{isLoading ? (
										<Lottie
											options={LoaderOptions}
											height={"100%"}
											width={"100%"}
										/>
									) : (
										"Save"
									)}
								</Button>
							</ButtonContainer>
						</Cover>
					</Modal>
				) : profileModalType === "date_of_birth" ? (
					<Modal>
						<Cover>
							<Title>
								{user_profile.dob
									? "Edit Date of Birth"
									: "Add Date of Birth"}
							</Title>
							<Description>
								We can provide you the certificate with the
								entered date of birth.
							</Description>
							<EmailCover onClick={() => setEdit(true)}>
								<img
									src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/calendar.svg
                                    "
									alt=""
								/>
								<Email
									onKeyDown={handleKeyDown}
									value={
										edit
											? formatDate(dateOfBirth)
											: user_profile.dob
											? formatDate(user_profile.dob)
											: null
									}
									placeholder={
										user_profile.dob
											? formatDate(user_profile.dob)
											: "DD MM YYYY"
									}
								/>
								<DatePickerCover>
									<MuiPickersUtilsProvider
										utils={DateFnsUtils}
									>
										<DatePicker
											error={false}
											label={null}
											onKeyDown={handleKeyDown}
											value={selectedDate}
											onChange={handleDateChange}
											// maxDate={today}
										/>
									</MuiPickersUtilsProvider>
								</DatePickerCover>
								{isError && (
									<ErrorMessage>{errorMessage}</ErrorMessage>
								)}
							</EmailCover>

							<ButtonContainer>
								<Button onClick={handleClose}>Cancel</Button>
								{isLoading ? (
									<Button className="save">
										<Lottie
											options={LoaderOptions}
											height={"100%"}
											width={"100%"}
										/>
									</Button>
								) : (
									<Button
										className="save"
										onClick={updateDoB}
									>
										Save
									</Button>
								)}
							</ButtonContainer>
						</Cover>
					</Modal>
				) : profileModalType === "success" ? (
					<SucessModal>
						<SuccesCard>
							<SuccessIcon>
								<Lottie
									options={defaultOptions}
									height={"100%"}
									width={"100%"}
								/>
							</SuccessIcon>
							<SuccessTitle>Success</SuccessTitle>
							<SuccessLabel>{successMessage}</SuccessLabel>
							<ContinueButton onClick={handleClose}>
								Continue
							</ContinueButton>
						</SuccesCard>
					</SucessModal>
				) : profileModalType === "otp" ? (
					<Modal>
						<Cover>
							<Title>Enter OTP</Title>
							<Description>
								Please enter the 4-digit OTP number sent to your
								registered email.
							</Description>
							<EmailCover>
								<Email
									onKeyDown={handleKeyDown}
									type="number"
									value={selectedOTP}
									placeholder="
                                        Enter OTP
                                    "
									onChange={handleOTPChange}
								/>
								{isError && (
									<ErrorMessage>{errorMessage}</ErrorMessage>
								)}
							</EmailCover>

							<ButtonContainer>
								<Button onClick={handleClose}>Cancel</Button>
								{isLoading ? (
									<Button className="save">
										<Lottie
											options={LoaderOptions}
											height={"100%"}
											width={"100%"}
										/>
									</Button>
								) : (
									<Button
										className="save"
										onClick={updateEmailOTP}
									>
										Save
									</Button>
								)}
							</ButtonContainer>
						</Cover>
					</Modal>
				) : profileModalType === "name" ? (
					<Modal>
						<Cover>
							<Title>Edit Name</Title>
							<Description>
								We can provide you the certificate with this
								name.
							</Description>
							<EmailCover>
								<ProfileIcon
									src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/profile.svg"
									alt="Icon"
								/>
								<Email
									type="text"
									onKeyDown={handleKeyDown}
									value={selectedName}
									placeholder={"Your Name"}
									onChange={(e) => changeName(e)}
								/>
								{isError && (
									<ErrorMessage>{errorMessage}</ErrorMessage>
								)}
							</EmailCover>

							<ButtonContainer>
								<Button onClick={handleClose}>Cancel</Button>

								<Button
									className="save"
									onClick={updateName}
									type={isError ? "notvalid" : "valid"}
								>
									{isLoading ? (
										<Lottie
											options={LoaderOptions}
											height={"100%"}
											width={"100%"}
										/>
									) : (
										"Save"
									)}
								</Button>
							</ButtonContainer>
						</Cover>
					</Modal>
				) : null}
			</BackContainer>
		</Container>
	);
}

export default ProfileModal;

const Container = styled.div``;
const BackContainer = styled.div`
	position: fixed;
	transition: 0.3s;
	transform: scale(0, 0);
	width: 100%;
	height: 100vh;
	z-index: 1000;
	left: 0;
	top: 0px;
	background: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(2px);
`;
const Overlay = styled.div`
	position: fixed;
	left: 0;
	top: 0px;
	width: 100%;
	height: 100vh;
`;
const Modal = styled.div`
	width: 650px;
	max-height: 127vh;
	margin: 0 auto;
	background: #fff;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	border-radius: 10px;
	transition: 0.5s;
	z-index: 101;
	@media all and (max-width: 768px) {
		width: 550px;
	}
	@media all and (max-width: 640px) {
		width: 450px;
	}
	@media all and (max-width: 480px) {
		width: 350px;
	}
	@media all and (max-width: 360px) {
		width: 300px;
	}
`;
const Cover = styled.div`
	width: 100%;
	// background: url() no-repeat;
	background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/modal-background.svg");
	background-size: cover;
	background-position: 0 0;
	padding: 40px 40px;
	@media all and (max-width: 480px) {
		padding: 20px;
	}
`;

const Title = styled.h3`
	font-size: 26px;
	font-family: gordita_medium;
	margin-bottom: 10px;
	@media all and (max-width: 480px) {
		font-size: 22px;
		margin-bottom: 0px;
	}
`;
const Description = styled.p`
	font-size: 16px;
	font-family: "gordita_medium";
	color: #333333;
	max-width: 400px;
	margin-bottom: 20px;
	@media all and (max-width: 480px) {
		font-size: 14px;
		font-family: gordita_regular;
	}
`;
const Categories = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 10px;
	margin-bottom: 20px;
	position: relative;
	@media all and (max-width: 480px) {
		grid-template-columns: 1fr 1fr;
	}
`;
const CategoryCard = styled.div`
	border: 2px solid #e5e5e5;
	background-color: #fbfbfb;
	padding: 20px 10px;
	border-radius: 5px;
	cursor: pointer;
	position: relative;
	transition: 0.3s ease-in-out;
	h3 {
		font-size: 16px;
		font-family: baloo_paaji_2medium;
		text-align: center;
		transition: 0.3s ease-in-out;
		@media all and (max-width: 640px) {
			font-size: 13px;
		}
	}
	p {
		font-size: 12px;
		text-align: center;
		font-family: "gordita_medium";
		transition: 0.3s ease-in-out;
		@media all and (max-width: 640px) {
			font-size: 10px;
		}
	}
	img {
		width: 30px;
		position: absolute;
		top: -10px;
		right: -10px;
		transition: 0.3s ease-in-out;
		opacity: 0;
	}
	&:hover {
		border: 2px solid #0fa76f;
		background-color: #e5f7f0;
		h3,
		p {
			color: #0fa76f;
		}
	}
	&.active {
		border: 1px solid #0fa76f;
		background-color: #e5f7f0;
		h3,
		p {
			color: #0fa76f;
		}
		img {
			opacity: 1;
		}
	}
`;
const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;
const Button = styled.span`
	width: 150px;
	height: 40px;
	display: flex;
	font-size: 15px;
	justify-content: center;
	align-items: center;
	font-family: gordita_medium;
	filter: ${(props) => (props.type === "notvalid" ? "grayscale(1)" : "")};
	cursor: ${(props) =>
		props.type === "notvalid" ? "not-allowed" : "pointer"};
	color: #0fa76f;
	border: 2px solid #0fa76f;
	border-radius: 5px;
	&:hover {
		opacity: 0.8;
	}
	&.save {
		color: #fff;
		background-color: #0fa76f;
		margin-left: 20px;
	}
`;
// gender modal styles...
const Gender = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 10px;
	margin-bottom: 30px;
	position: relative;
	@media all and (max-width: 480px) {
		grid-template-columns: 1fr 1fr;
	}
`;
const GenderCard = styled.span`
	cursor: pointer;
	border: 2px solid #e8e8e8;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	background-color: #fff;
	border-radius: 5px;
	transition: 0.3s ease-in-out;
	position: relative;
	h3 {
		font-size: 13px;
		font-family: gordita_medium;
		margin-right: 10px;
		transition: 0.3s ease-in-out;
		@media all and (max-width: 640px) {
			font-size: 12px;
		}
	}

	&:hover {
		border: 2px solid #0fa76f;
		background-color: #e5f7f0;
		h3 {
			color: #0fa76f;
		}
	}
	&.active {
		border: 2px solid #0fa76f;
		background-color: #e5f7f0;
		h3 {
			color: #0fa76f;
		}
	}
`;
const Icon = styled.img`
	width: 16px;
	display: block;
`;

const Tick = styled.img`
	width: 30px;
	position: absolute;
	top: -10px;
	right: -10px;
	transition: 0.3s ease-in-out;
	opacity: 0;
	&.active {
		opacity: 1;
	}
`;

//email modal styless...

const EmailCover = styled.form`
	width: 100%;
	height: 50px;
	background: #fff;
	display: flex;
	align-items: center;
	padding: 0 15px;
	margin-bottom: 30px;
	box-shadow: 0px 3px 37px #00000017;
	border-radius: 5px;
	position: relative;
	img {
		width: 20px;
		display: block;
		margin-right: 15px;
	}
`;
const ProfileIcon = styled.img`
	width: 17px !important;
`;
const Email = styled.input`
	font-size: 16px;
	font-family: "gordita_medium";
	color: #727171;
	flex: 1;
	@media all and (max-width: 480px) {
		font-size: 14px;
	}
`;

const ErrorMessage = styled.p`
	font-size: 12px;
	color: red;
	position: absolute;
	bottom: -20px;
`;

//date of birth picker
const DatePickerCover = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

// sucess modal

const SucessModal = styled.div`
	width: 450px;
	max-height: 127vh;
	min-height: 200px;
	margin: 0 auto;
	background: #fff;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	border-radius: 10px;
	transition: 0.5s;
	z-index: 101;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	@media all and (max-width: 480px) {
		width: 330px;
		min-height: 170px;
	}
	@media all and (max-width: 360px) {
		width: 300px;
	}
`;

const SuccesCard = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	padding: 20px;
`;
const SuccessIcon = styled.div`
	width: 150px;
	height: 150px;
	border-radius: 50%;
	box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
	margin: 0 auto;
	background-color: #fff;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: -80px;
	margin: 0 auto;
	@media all and (max-width: 480px) {
		width: 100px;
		height: 100px;
		top: -65px;
	}
`;
const SuccessTitle = styled.h3`
	text-align: center;
	font-size: 34px;
	font-family: "baloo_paaji_2semibold";
	margin-top: 60px;
	@media all and (max-width: 480px) {
		font-size: 26px;
		margin-top: 30px;
	}
`;
const SuccessLabel = styled.p`
	font-size: 18px;
	text-align: center;
	font-family: "gordita_medium";
	color: #3c4852;
	max-width: 350px;
	max-width: 420px;
	@media all and (max-width: 480px) {
		font-size: 16px;
	}
`;
const ContinueButton = styled.span`
	width: 100%;
	height: 50px;
	background-color: #4ba870;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "baloo_paaji_2semibold";
	margin-top: 30px;
	border-radius: 5px;
	font-size: 20px;
	cursor: pointer;
`;
