const defaultValues = {
  // Account Info - Basic Information
  avatar: null,
  academic_affiliation: "",
  academic_role: "",
  job_title: "",
  workplace: "",
  bio: "",
  first_name: "",
  last_name: "",
  mobile: "",
  nation_code: "",
  gender: "",
  father_name: "",
  state: "",
  city_id: "",
  email: "",
  university_id: "",
  university_title: "",
  field_id: "",
  field_title: "",
  education_tendency: "",
  last_degree_university: "",
  education_title: "",
  education_image: null,

  // Account Info - Educational Activities
  education_activities: [
    {
      organization: "",
      position: "",
    },
  ],

  // Account Info - Educational History
  education_histories: [
    {
      title: "",
      type: "",
      url: "",
    },
  ],

  // Account Info - Additional Fields
  resume: null,
  introduction_video: null,
  is_introduction_video_public: false,
  user_description: "",
  about_me: "",
  is_about_me_public: false,
  rules_agreed: false,

  // Course - Basic information
  image: null,
  name: "",
  prerequisite_title: "",
  week_count: undefined,
  avg_lesson_time: null,
  theoretical_count: null,
  practical_count: null,
  basic_info: "",
  description: "",
  references: {
    main_references: [{ reference: "", file: null }],
    additional_references: [{ reference: "", file: null }],
  },

  // Course - Category information
  section: "university",
  grade: "",
  branch: [],
  main_group: [],
  side_group: [],
  field: [],
  lesson: [],
  academic_branch: "",
  academic_group: [],
  academic_field: [],

  // Course - Category college information
  is_college: "",
  colleges: [],

  // Course - Headline information
  headlines: [
    {
      id: null,
      title: "",
      name: "",
    },
  ],

  // Course - Part of video information
  part_of_video: null,

  // Course - Contract type information
  estimate_price: "",
  contract_type: "",
  course_creation_rules_agreed: false,

  // Course - Signed contract information
  contract: "",
  signed_contract: null,
  signed_contract_rules_agreed: false,
  otp: "",

  // Course - Miscellaneous fields
  status: "public",
  content_id_pdf: "",
  content_id_video: "",
};

export { defaultValues };
