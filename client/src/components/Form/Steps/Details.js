import Select from "../../shared/FormElements/Select";
import TextField from "../../shared/FormElements/TextField";
import CheckBox from "../../shared/FormElements/CheckBox";
import StepWrapper from "../StepWrapper";
import Dependent from "./Dependent"
import { PrimaryButton } from "../../shared/Buttons";
import { useEffect, useState } from "react";

const Details = ({ errorIds, title, data }) => {
  const [dependents, setDependents] = useState(0);
  const [spouse, setSpouse] = useState(false);

  useEffect(() => {
     setDependents(data?.dependents?.length || 0)
     setSpouse(!!dependents?.spouse)
  }, [data])

  return (
    <div>
      <StepWrapper title={title}>
        <div>
          <div className="flex space-x-6 mb-6">
            <TextField
              label={"Your Date of Birth"}
              id={"dob"}
              type={"date"}
              pattern={"(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d|3[01])"}
              error={errorIds.includes("dob")}
              value={data?.dob || ""}
            />
            <TextField
              label={"Zip Code"}
              id={"zip"}
              type={"number"}
              placeholder={"Zip Code"}
              pattern={".{5}"}
              error={errorIds.includes("zip")}
              value={data?.zip || ''}
            />
            <div className="flex-1">
              <Select
                label="Year"
                id={"year"}
                options={["2024", "2024"]}
                error={errorIds.includes("year")}
                value={data?.year || ''}
              />
            </div>
          </div>
          <div className="flex space-x-6 mb-6">
            <TextField
              label={"First Name"}
              id={"first_name"}
              type={"text"}
              placeholder={"First Name"}
              pattern={".{2,20}"}
              error={errorIds.includes("first_name")}
              value={data?.first_name || ''}
            />
            <TextField
              label={"Last Name"}
              id={"last_name"}
              type={"text"}
              placeholder={"Last Name"}
              pattern={".{2,20}"}
              value={data?.last_name || ''}
              error={errorIds.includes("last_name")}
            />
          </div>
          <CheckBox
            label={
              "Eligible for coverage through a job, Medicaid, Medicare, or CHIP"
            }
            id={"has_mec"}
            value={data?.has_mec || ''}
          />
          <CheckBox
            label={
              "Used tobacco products four (4) or more times per week on average during the past six (6) months (not including ceremonial uses)"
            }
            id={"uses_tobacco"}
            value={data?.users_tobacco || ''}
          />
        </div>
      </StepWrapper>
      {Array.from({ length: dependents }).map((val, index) => (
        <Dependent title={(index === 0 && spouse) ? "Spouse" : "Dependent"} errorIds={errorIds} n={index + 1} data={data.dependents[index]} />
      ))}
      <div className="w-full max-w-2xl mx-auto flex justify-between space-x-4 mt-4">
        <PrimaryButton
          text={"Spouse"}
          classNames="w-[50%] !border-green-500 !text-green-500 !font-bold hover:bg-transparent hover:bg-green-500 hover:!text-white"
          onClick={() => {
            setSpouse(true);
            setDependents(dependents + 1)
          }}
        />
        <PrimaryButton
          text={"Dependent"}
          classNames="w-[50%] !border-green-500 !text-green-500 !font-bold hover:bg-green-500 hover:!text-white"
          onClick={() => setDependents(dependents + 1)}
        />
      </div>
    </div>
  );
};

export default Details;
