import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { learnConfig } from "../../../../../axiosConfig";

const ViewAllFilter = ({
  buttonRef,
  handleFliterShow,
  isFilter,
  user_data,
  array,
  setFinalArray,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  //fetching datas
  const [professions, setProfessions] = useState([]);
  const [skills, setSkills] = useState([]);
  const [lessons, setLessons] = useState([]);

  //checkFilter
  const [professionValue, setProfessionValue] = useState(null);
  const [skillValue, setSkillValue] = useState(null);
  const [lessonValue, setLessonValue] = useState(null);

  // Search term
  const [searchTerm, setSearchTerm] = useState(null);
  const selectRef = useRef(null);

  function useOutsideAlerter(ref) {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleFliterShow();
      }
    }
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    setSkillValue(null);
    setLessonValue(null);
    if (professionValue) {
      skillLoad();
    }
  }, [professionValue]);

  useEffect(() => {
    setLessonValue(null);
    if (skillValue) {
      lessonLoad();
    }
  }, [skillValue]);

  useEffect(() => {
    // setInitialSearch();
  }, []);

  const setInitialSearch = () => {
    const { search } = location;
    const values = queryString.parse(search);
    const searchQuery = values.q;
    const lesson = values.l;
    const skill = values.s;
    const profession = values.p;
    setProfessionValue(profession);
    setTimeout(() => {
      setSkillValue(skill);
    }, 200);
    setTimeout(() => {
      setLessonValue(lesson);
    }, 400);
    setSearchTerm(searchQuery);
    onFilter(lesson, skill, profession, searchQuery);
  };

  const handleSearchChange = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    } else {
      setSearchTerm(event.target.value);
    }
  };

  const onChange = (event) => {
    let { name, value } = event.target;
    name == "professions"
      ? setProfessionValue(value)
      : name == "skills"
      ? setSkillValue(value)
      : name == "lessons" && setLessonValue(value);
  };

  const onFilter = (
    lesson = lessonValue,
    skill = skillValue,
    profession = professionValue,
    searchQuery = searchTerm
  ) => {
    let temp = array;
    if (lesson) {
      temp = array.filter((item) => lesson == item.lesson_pk);
    } else if (skill) {
      temp = array.filter((item) => skill == item.skill_pk);
    } else if (profession) {
      temp = array.filter((item) => profession == item.designation_pk);
    }
    if (searchQuery) {
      temp = temp.filter(
        (item) =>
          item.title.includes(searchQuery) ||
          item.title.toLowerCase().includes(searchQuery) ||
          item.title.toUpperCase().includes(searchQuery)
      );
    }

    setFinalArray(temp);
    navigate({
      pathname: location.pathname,
      search: `?${searchQuery ? `q=${searchQuery}` : ""}${
        lesson ? `&l=${lesson}` : ""
      }${skill ? `&s=${skill}` : ""}${profession ? `&p=${profession}` : ""}`,
    });
  };

  useEffect(() => {
    let { access_token } = user_data;
    learnConfig
      .get("/learn/designations/", {
        params: {
          response_type: "minimal",
        },
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => {
        let { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setProfessions(data);
        } else if (StatusCode === 6001) {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const skillLoad = () => {
    let { access_token } = user_data;
    if (professionValue) {
      learnConfig
        .get("/learn/skills/" + professionValue + "/", {
          params: {
            response_type: "minimal",
          },
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          let { StatusCode, data } = response.data;
          if (StatusCode === 6000) {
            setSkills(data);
          } else if (StatusCode === 6001) {
            console.log("Could not fetch");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const lessonLoad = () => {
    let { access_token } = user_data;
    setLessons([]);
    if (skillValue) {
      learnConfig
        .get("/learn/lessons/" + skillValue + "/", {
          params: {
            response_type: "minimal",
          },
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          let { StatusCode, data } = response.data;
          if (StatusCode === 6000) {
            setLessons(data);
          } else if (StatusCode === 6001) {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const selectItem = useRef(null);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <FilterContainer ref={wrapperRef} onChange={onChange}>
      {/* <SearchContaner>
                <IconContainer htmlFor="search-input">
                    <SearchIcon
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/search-icon.svg"
                        alt=""
                    />
                </IconContainer>
                <SearchInput
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    id="search-input"
                    value={searchTerm ? searchTerm : ""}
                />
            </SearchContaner> */}
      <FilterTitle>Filter</FilterTitle>
      <SelectSection ref={selectItem} id="select">
        <Label>Professions</Label>
        <Selection name="professions">
          <option value="">Choose Professions</option>
          {professions.map((item) => (
            <option
              key={item.id}
              defaultValue={item.id === professionValue && "selected"}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </Selection>
        <Label>Skills</Label>
        <Selection name="skills">
          <option value="">Choose Skills</option>
          {skills.map((item) => (
            <option
              key={item.id}
              defaultValue={item.id === skillValue && "selected"}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </Selection>
        <Label>Lessons</Label>
        <Selection name="lessons">
          <option value="">Choose Lessons</option>
          {lessons.map((item) => (
            <option
              key={item.id}
              defaultValue={item.id === lessonValue && "selected"}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </Selection>
        <Button type="button" onClick={() => onFilter()}>
          Submit
        </Button>
      </SelectSection>
    </FilterContainer>
  );
};

export default ViewAllFilter;
const FilterContainer = styled.div`
  margin-top: 30px;
`;
const SearchContaner = styled.form`
  background-color: #e8f0fe;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 30px;
`;
const IconContainer = styled.label`
  width: 16px;
  display: inline-block;
  margin: 10px;
`;
const SearchIcon = styled.img`
  width: 100%;
  display: block;
`;
const SearchInput = styled.input`
  color: #000;
  font-size: 17px;
  width: 100%;
  font-family: "gordita_medium";
  &::placeholder {
    color: #000;
  }
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;
const FilterTitle = styled.p`
  color: #424242;
  margin-bottom: 15px;
`;
const SelectSection = styled.form``;
const Label = styled.p`
  margin-bottom: 7px;
  @media (max-width: 480px) {
    margin-bottom: 3px;
    font-size: 14px;
  }
`;
const Selection = styled.select`
  background-color: #e8f0fe;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 30px;
  width: 100%;
  font-size: 18px;
  &::styled-select select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
const Options = styled.option``;
const Button = styled.button`
  background: #039ef7;
  padding: 5px 0;
  border-radius: 5px;
  margin-bottom: 30px;
  width: 100%;
  color: #fff;
  font-size: 18px;
  font-family: "gordita_medium";
  cursor: pointer;
  margin-top: 10px;
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;
