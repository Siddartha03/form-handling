import React, { useEffect, useRef, useState } from "react";
import { City, Country, State } from "country-state-city";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  FormAutoComplete,
  FormCheckbox,
  FormDatepicker,
  FormPhoneNumberField,
  FormRadioButtons,
  FormSelectField,
  FormTextField,
  LoaderComponent,
  PageTitle,
} from "../components";
import { addressMapper } from "../utils/helper";
import { validationRules } from "../utils/validationRules";
import defaultProfileImage from "../assets/images/defaultProfilePic.svg";

const Forms = () => {
  const imageUploader = useRef(null);
  const uploadedImage = useRef(null);
  const [profileImageError, setProfileImageError] = useState("");
  const [files, setFiles] = useState("");
  const [upsertUser, setUpsertUser] = useState("");
  const [mapPermanentStates, setMapPermanentStates] = useState([]);
  const [mapPermanentCities, setMapPermanentCities] = useState([]);
  const [uploadUserImage, setUploadUserImage] = useState({});
  const [mapCities, setMapCities] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapStates, setMapStates] = useState([]);
  const [studentData, setStudentData] = useState({});
  const [editedCurrentCountry, setEditedCurrentCountry] = useState(null);
  const [editedPermanentCountry, setEditedPermanentCountry] = useState(null);
  const [loading, setLoading] = useState(false);

  const PROFILE_IMAGE_VALIDATION = {
    fileType: ["image/png", "image/jpeg", "image/jpg"],
    fileTypeText: ["png", "jpeg", "jpg"],
    fileTypeError: "Support .png, .jpg and .jpeg formats",
    fileSize: 2, // in MB
    fileSizeError: "Upload image less than or equal to 2MB",
  };

  const initialValues = {
    first_name: "",
    tenant_name: "",
    middle_name: "",
    last_name: "",
    contact_no: "",
    email: "",
    uid: "",
    created_by: "",
    medium: "",
    category: "",
    specially_abled: "",
    course_code: "",
    college_id: "",
    institute_name: "",
    abc_id: "",
    enrollment_id: "",
    study_center_code: "",
    gender: "male",
    marital_status: "",
    DOB: "",
    id_type: "",
    id_number: "",
    father_name: "",
    father_contact: "",
    father_email: "",
    mother_name: "",
    mother_contact: "",
    mother_email: "",
    mother_maiden_name: "",
    education_detail: [{ education: "", School: "", University: "", degree: "" }],
    profile_picture: "",
    student_address: [
      {
        p_locality: "",
        p_city: "",
        p_state: "",
        p_country: "",
        p_pincode: "",
        is_current_address_same: false,
        c_locality: "",
        c_city: "",
        c_state: "",
        c_country: "",
        c_pincode: "",
      },
    ],
    role_id: [{ roleId: "" }],
    user_group_id: [{ group_id: "" }],
    user_program_mapping: [
      {
        user_type: "",
        program_name: "",
        department: "",
        program: "",
        year: "",
        year_id: "",
        semester: "",
        semester_id: "",
        exam_medium: "",
      },
    ],
    program_details: "",
    assignProgramFieldOption: [
      {
        id: 0,
        program: "",
        batch: "",
        program_list: [],
      },
    ],
  };

  const methods = useForm({
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    // setFocus,
    // formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "education_detail",
  });

  const addEducationalDetails = () => {
    append({ education: "", School: "", University: "", degree: "" });
  };

  const deleteEducationDetails = (index) => {
    remove(index);
  };

  useEffect(() => {
    const countryData = Country.getAllCountries() || [];
    const countryMapper = addressMapper(countryData, "name", "isoCode");
    setMapCountries(countryMapper);
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "student_address.0.c_country") {
        setValue("student_address.0.c_state", " ");
        setValue("student_address.0.c_city", " ");
        const stateData = State.getStatesOfCountry(value?.student_address?.[0]?.c_country?.value);
        const mappedState = addressMapper(stateData, "name", "isoCode");
        setMapStates(mappedState);
      }
      if (name === "student_address.0.c_state") {
        setValue("student_address.0.c_city", " ");
        const cityData = City.getCitiesOfState(
          value?.student_address?.[0]?.c_country?.value,
          value?.student_address?.[0]?.c_state?.value
        );
        const mappedCity = addressMapper(cityData, "name", "stateCode");
        setMapCities(mappedCity);
      }

      if (!value?.student_address?.[0].is_current_address_same) {
        if (name === "student_address.0.p_country") {
          setValue("student_address.0.p_state", " ");
          setValue("student_address.0.p_city", " ");
          const stateData = State.getStatesOfCountry(value?.student_address?.[0]?.p_country?.value);
          const mappedState = addressMapper(stateData, "name", "isoCode");
          setMapPermanentStates(mappedState);
        }
        if (name === "student_address.0.p_state") {
          setValue("student_address.0.p_city", " ");
          const cityData = City.getCitiesOfState(
            value?.student_address?.[0]?.p_country?.value,
            value?.student_address?.[0]?.p_state?.value
          );
          const mappedCity = addressMapper(cityData, "name", "stateCode");
          setMapPermanentCities(mappedCity);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const watchIsAddressSame = watch("student_address.0.is_current_address_same");
  const clocality = watch("student_address.0.c_locality");
  const ccity = watch("student_address.0.c_city");
  const cstate = watch("student_address.0.c_state");
  const ccountry = watch("student_address.0.c_country");
  const cpincode = watch("student_address.0.c_pincode");

  useEffect(() => {
    if (watchIsAddressSame) {
      setValue("student_address.0.p_state", cstate);
      setValue("student_address.0.p_locality", clocality);
      setValue("student_address.0.p_country", ccountry);
      setValue("student_address.0.p_pincode", cpincode);
      setValue("student_address.0.p_city", ccity);
    } else {
      setValue("student_address.0.p_state", "");
      setValue("student_address.0.p_locality", "");
      setValue("student_address.0.p_country", "");
      setValue("student_address.0.p_pincode", "");
      setValue("student_address.0.p_city", "");
    }
  }, [watchIsAddressSame, clocality, ccity, cstate, ccountry, cpincode]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const gendersOptions = [
    {
      id: "1",
      label: "Male",
      key: "1",
      value: "male",
    },
    { id: "2", label: "Female", key: "2", value: "female" },
    { id: "3", label: "Other", key: "3", value: "other" },
  ];

  const maritialOptions = [
    {
      id: "1",
      label: "Married",
      key: "1",
      value: "married",
    },
    {
      id: "2",
      label: "Un Married",
      key: "2",
      value: "unmarried",
    },
  ];

  return (
    <div>
      {loading && <LoaderComponent visible={loading} />}
      <h2 className="title-name">Form Handling</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: { xl: "80%", lg: "80%" },
              mt: 2,
            }}
          >
            <Box
              sx={{
                borderRadius: "8px",
                p: 2,
                mt: 3,
                border: "1px solid #E0E0E0",
              }}
            >
              <Typography variant="h4" fontWeight={400}>
                Student Informatio
              </Typography>
              <Divider sx={{ my: 1.6 }} />
              <Grid container spacing={2}>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormTextField
                    name="first_name"
                    rules={{
                      required: validationRules.REQUIRED,
                      pattern: validationRules.FIRST_NAME,
                    }}
                    variant="outlined"
                    label="First Name"
                    size="small"
                    fullWidth
                    isAsterisk
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormTextField
                    name="middle_name"
                    variant="outlined"
                    label="Middle Name"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormTextField
                    name="last_name"
                    variant="outlined"
                    label="Last Name"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormPhoneNumberField
                    name="contact_no"
                    variant="outlined"
                    label="Mobile Number"
                    size="small"
                    fullWidth
                    isAsterisk
                    defaultValue={watch("contact_no")}
                    errorMessage="Mobile number not valid."
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormTextField
                    name="email"
                    rules={{
                      required: validationRules.REQUIRED,
                      pattern: validationRules.EMAIL,
                    }}
                    variant="outlined"
                    label="Email"
                    size="small"
                    fullWidth
                    isAsterisk
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormTextField
                    name="uid"
                    rules={{
                      required: validationRules.REQUIRED,
                    }}
                    variant="outlined"
                    label="Registration Number"
                    size="small"
                    fullWidth
                    isAsterisk
                  />
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                borderRadius: "8px",
                p: 2,
                mt: 3,
                border: `1px solid #E0E0E0`,
              }}
            >
              <Typography variant="h4" fontWeight={400}>
                Student Personal Information
              </Typography>
              <Divider sx={{ my: 1.6 }} />
              <Grid container spacing={2}>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormRadioButtons
                    name="gender"
                    className="gender"
                    size="small"
                    options={gendersOptions}
                    isAsterisk
                    rules={{
                      required: validationRules.REQUIRED,
                    }}
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormSelectField
                    name="marital_status"
                    variant="outlined"
                    label="Marital Status"
                    size="small"
                    fullWidth
                    options={maritialOptions}
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormDatepicker name="DOB" fullWidth label="Date of Birth" format="YYYY-MM-DD" />
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                borderRadius: "8px",
                p: 2,
                mt: 3,
                border: `1px solid #E0E0E0`,
              }}
            >
              <Typography variant="h4" fontWeight={400}>
                Local Address
              </Typography>
              <Divider sx={{ my: 1.6 }} />
              <Grid container spacing={2}>
                <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
                  <FormTextField
                    name="student_address.0.c_locality"
                    variant="outlined"
                    label="Locality/ Street Address"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormAutoComplete
                    name="student_address.0.c_country"
                    variant="outlined"
                    label="Country"
                    size="small"
                    fullWidth
                    getOptionLabel={(option) => (option?.label ? option?.label : "")}
                    options={mapCountries || []}
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormAutoComplete
                    name="student_address.0.c_state"
                    variant="outlined"
                    label="State"
                    size="small"
                    fullWidth
                    getOptionLabel={(option) => (option?.label ? option?.label : "")}
                    options={mapStates}
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormAutoComplete
                    name="student_address.0.c_city"
                    variant="outlined"
                    label="City"
                    size="small"
                    fullWidth
                    getOptionLabel={(option) => (option?.label ? option?.label : "")}
                    options={mapCities || []}
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormTextField
                    name="student_address.0.c_pincode"
                    variant="outlined"
                    label="Pin code"
                    size="small"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 1.6 }} />
              <Stack direction="row" alignItems="center" spacing={3}>
                <Typography variant="h4" fontWeight={400}>
                  Permanent Address
                </Typography>
                <FormCheckbox
                  name="student_address.0.is_current_address_same"
                  label="Same as local address"
                  size="small"
                />
              </Stack>
              <Divider sx={{ my: 1.6 }} />

              <Grid container spacing={2}>
                <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
                  <FormTextField
                    name="student_address.0.p_locality"
                    variant="outlined"
                    label="Locality/ Street Address"
                    size="small"
                    fullWidth
                    disabled={watchIsAddressSame}
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormAutoComplete
                    name="student_address.0.p_country"
                    variant="outlined"
                    label="Country"
                    size="small"
                    fullWidth
                    getOptionLabel={(option) => (option?.label ? option?.label : "")}
                    options={mapCountries || []}
                    disabled={watchIsAddressSame}
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormAutoComplete
                    name="student_address.0.p_state"
                    variant="outlined"
                    label="State"
                    size="small"
                    fullWidth
                    getOptionLabel={(option) => (option?.label ? option?.label : "")}
                    options={mapPermanentStates || []}
                    disabled={watchIsAddressSame}
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormAutoComplete
                    name="student_address.0.p_city"
                    variant="outlined"
                    label="City"
                    size="small"
                    fullWidth
                    getOptionLabel={(option) => (option?.label ? option?.label : "")}
                    options={mapPermanentCities || []}
                    disabled={watchIsAddressSame}
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <FormTextField
                    name="student_address.0.p_pincode"
                    variant="outlined"
                    label="Pin code"
                    size="small"
                    fullWidth
                    disabled={watchIsAddressSame}
                  />
                </Grid>
              </Grid>
            </Box>

            <Stack direction={"row"} justifyContent={"end"} spacing={2} mt={3}>
              {/* <Button
                variant="outlined"
                color="secondary"
                onClick={handelCancel}
                className="qa-cancel-btn"
                size="medium"
              >
                {t("cancel")}
              </Button> */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="qa-submit-btn"
                size="medium"
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

export default Forms;
