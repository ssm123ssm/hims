"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";

import React from "react";
import { set } from "mongoose";
import { isValid, isValidForm } from "@/app/utils/validate";

const Admission_card = () => {
  const [form, setForm] = useState({
    id: ["000"],
    ns1_status: [{ value: "Negative", timestamp: Date.now() }],
    dexamethasone: [{ value: "No", timestamp: Date.now() }],
    status: ["active"],
  });
  const [submiting, setSubmiting] = useState(false);
  const router = useRouter();
  const [validations, setValidations] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm((pr) => ({ ...pr, ["id"]: ["123"] }));
    const isValid = Object.values(validations).every((v) => v);
    const validationMessages = //create a message to user pointing out which fields are not valid
      Object.keys(validations)
        .filter((key) => !validations[key])
        .join(", ") + "  not valid";

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      console.log(validations[input.name]);
      if (
        // check if validations[input.name] is true or undefined
        validations[input.name] === undefined ||
        validations[input.name]
      ) {
      } else {
        //add the input field font color to red
        input.style.color = "red";

        //change font to bold
        input.style.fontWeight = "bold";
      }
    });

    const isValidAdmissionForm = isValidForm(form, [
      "first_name",
      "bht_number",
    ]);
    if (!isValid) {
      alert(validationMessages);
    } else if (!isValidAdmissionForm) {
      alert("Name and the BHT number are required fields.");
    } else {
      const res = await fetch("/api/admission", {
        method: "POST",
        body: JSON.stringify({ form }),
        "Content-Type": "application/json",
      });

      if (res.ok) {
        setSubmiting(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 0);
      }
    }
  };

  const handleChange = (e, edit) => {
    console.log(form);
    const value = e.target.value;
    const name = e.target.name;
    const validation = setValidations((pr) => {
      const newValidation = { ...pr, [name]: isValid(value, name) };
      return newValidation;
    });

    if (edit) {
      console.log("edit:", edit);
      setForm((pr) => ({ ...pr, [name]: value, [edit]: [+value] }));
    } else {
      setForm((pr) =>
        //check if pr[name] is empty array or an array of objects
        ({
          ...pr,
          [name]: [
            {
              value: value,
              timestamp: Date.now(),
            },
          ],
        })
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Card className=" p-4 my-4 flex justify-start max-w-[800px] mx-4 overflow-auto w-4/5 max-h-screen">
      <CardHeader className="font-weight-300 text-gray-500 flex justify-center mb-5">
        Admission Card
      </CardHeader>
      <Divider />
      <form className="" onSubmit={handleSubmit} method="post">
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem title="Admission Form" key="1">
            <CardBody className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div className="w-full">
                <Input
                  type="text"
                  label="Full name"
                  name="first_name"
                  onChange={handleChange}
                  size="sm"
                />
              </div>
              <Input
                type="text"
                label="Age (years)"
                name="age"
                onChange={handleChange}
                size="sm"
              />
              <Input
                type="text"
                label="BHT Number"
                name="bht_number"
                onChange={handleChange}
                size="sm"
              />
              <Input
                type="text"
                label="Bed number"
                name="bed_number"
                onChange={handleChange}
                size="sm"
              />

              <Input
                type="text"
                label="Date of fever"
                name="date_of_fever"
                onChange={handleChange}
                size="sm"
              />

              <Input
                type="datetime-local"
                label="Date of leak over"
                name="date_of_leak_over"
                onChange={handleChange}
                size="sm"
                labelPlacement="outside-left"
              />

              <div className="flex gap-5 justify-evenly flex-col">
                <RadioGroup
                  label="NS1 Status"
                  name="ns1_status"
                  onChange={handleChange}
                  size="sm"
                  defaultValue="Negative"
                >
                  <Radio value="Negative">Negative</Radio>
                  <Radio value="Positive">Positive</Radio>
                  <Radio value="NA">Not available</Radio>
                </RadioGroup>

                <RadioGroup
                  label="Dexamethasone"
                  name="dexamethasone"
                  onChange={handleChange}
                  size="sm"
                  defaultValue="No"
                  orientation="horizontal"
                >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-5 justify-between">
                <Input
                  type="text"
                  label="Platelet count"
                  name="plt"
                  onChange={handleChange}
                  size="sm"
                />
                <Input
                  type="text"
                  label="CRP"
                  name="crp"
                  onChange={handleChange}
                  size="sm"
                />
                <Input
                  type="text"
                  label="Serum creatinine"
                  name="scr"
                  onChange={handleChange}
                  size="sm"
                />

                <Input
                  type="text"
                  label="WBC"
                  name="wbc"
                  onChange={handleChange}
                  size="sm"
                />

                <Input
                  type="text"
                  label="SGOT"
                  name="sgot"
                  onChange={handleChange}
                  size="sm"
                />

                <Input
                  type="text"
                  label="SGPT"
                  name="sgpt"
                  onChange={handleChange}
                  size="sm"
                />

                <Input
                  type="text"
                  label="INR"
                  name="inr"
                  onChange={handleChange}
                  size="sm"
                />

                <Input
                  type="text"
                  label="PCV"
                  name="pcv"
                  onChange={handleChange}
                  size="sm"
                />
                <Input
                  type="text"
                  label="Hb"
                  name="hb"
                  onChange={handleChange}
                  size="sm"
                />
              </div>

              <div className="flex gap-5 flex-col">
                <Input
                  type="text"
                  label="VOTS"
                  name="vots"
                  onChange={handleChange}
                  size="sm"
                />
                <Input
                  type="text"
                  label="Ultra sound findings"
                  name="ultrasound_findings"
                  onChange={handleChange}
                  size="sm"
                />
                <div className="w-full flex justify-center">
                  <Textarea
                    label="History & Examination findings"
                    placeholder="Enter the description"
                    name="hx"
                    className="w-full"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardBody>
          </AccordionItem>
          <AccordionItem
            title="History and Examination findings"
            key="2"
            className=""
          ></AccordionItem>
        </Accordion>

        <div
          className="
              flex flex-row justify-center"
        >
          {submiting ? (
            <Button className="text-white" isLoading isDisabled>
              Submitting
            </Button>
          ) : (
            <Button type="submit" className="text-white bg-purple-400">
              Submit
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default Admission_card;
