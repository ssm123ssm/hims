"use client";

//This is the admission form component. This form should submit the form data to the mongodb database and then redirect to the dashboard page.

import { useState } from "react";
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

import React from "react";

const Admission_card = ({ props: data }) => {
  const [form, setForm] = useState(data);
  const [submiting, setSubmiting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setForm((pr) => ({ ...pr, ["id"]: "123" }));
    console.log(form);
    const res = await fetch("/api/edit", {
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
  };

  const handleChange = (e, edit) => {
    const value = e.target.value;
    const name = e.target.name;

    setForm((pr) => ({
      ...pr,
      [name]:
        pr[name].length === 0
          ? [value] // If the array is empty, create a new array with the value
          : pr[name].map((item, index) => (index === 0 ? value : item)),
    }));

    console.log(form);
  };

  const handleCancel = () => {
    router.back();
  };

  //add an event handler to listen for enter key press and submit the form
  onkeydown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Card className=" p-4 my-4 justify-center mx-auto w-[800px]">
      <CardHeader className="font-bold text-purple-500 flex justify-center mb-5">
        Edit card
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
                  defaultValue={data?.first_name[0]}
                />
              </div>
              <Input
                type="text"
                label="Age (years)"
                name="age"
                onChange={handleChange}
                size="sm"
                defaultValue={data?.age[0]}
              />
              <Input
                type="text"
                label="BHT Number"
                name="bht_number"
                onChange={handleChange}
                size="sm"
                defaultValue={data?.bht_number[0]}
              />
              <Input
                type="text"
                label="Bed number"
                name="bed_number"
                onChange={handleChange}
                size="sm"
                defaultValue={data?.bed_number[0]}
              />

              <Input
                type="text"
                label="Date of fever"
                name="date_of_fever"
                onChange={handleChange}
                size="sm"
                defaultValue={data?.date_of_fever[0]}
              />

              <Input
                type="datetime-local"
                label="Date of leak over"
                name="date_of_leak_over"
                onChange={handleChange}
                size="sm"
                labelPlacement="outside-left"
                defaultValue={data?.date_of_leak_over[0]}
              />

              <div className="flex gap-5 justify-evenly flex-col">
                <RadioGroup
                  label="NS1 Status"
                  name="ns1_status"
                  onChange={handleChange}
                  size="sm"
                  defaultValue={data?.ns1_status[0]}
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
                  defaultValue={data?.dexamethasone[0]}
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
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  size="sm"
                  defaultValue={data?.plt[0]}
                />
                <Input
                  type="text"
                  label="CRP"
                  name="crp"
                  onChange={handleChange}
                  size="sm"
                  defaultValue={data?.crp[0]}
                />
                <Input
                  type="text"
                  label="Serum creatinine"
                  name="scr"
                  onChange={handleChange}
                  size="sm"
                  defaultValue={data?.scr[0]}
                />

                <Input
                  type="text"
                  label="WBC"
                  name="wbc"
                  onChange={handleChange}
                  size="sm"
                  defaultValue={data?.wbc[0]}
                />

                <Input
                  type="text"
                  label="SGOT"
                  name="sgot"
                  onChange={handleChange}
                  size="sm"
                  defaultValue={data?.sgot[0]}
                />

                <Input
                  type="text"
                  label="SGPT"
                  name="sgpt"
                  onChange={handleChange}
                  size="sm"
                  defaultValue={data?.sgpt[0]}
                />

                <Input
                  type="text"
                  label="INR"
                  name="inr"
                  onChange={handleChange}
                  size="sm"
                  defaultValue={data?.inr[0]}
                />

                <Input
                  type="text"
                  label="PCV"
                  name="pcv"
                  onChange={handleChange}
                  size="sm"
                  defaultValue={data?.pcv[0]}
                />
                <Input
                  type="text"
                  label="Hb"
                  name="hb"
                  onChange={handleChange}
                  size="sm"
                  defaultValue={data?.hb[0]}
                />
              </div>

              <div className="flex gap-5 flex-col">
                <Input
                  type="text"
                  label="VOTS"
                  name="vots"
                  onChange={handleChange}
                  size="sm"
                  defaultValue={data?.vots[0]}
                />
                <Input
                  type="text"
                  label="Ultra sound findings"
                  name="ultrasound_findings"
                  onChange={handleChange}
                  size="sm"
                  defaultValue={data?.ultrasound_findings[0]}
                />
              </div>
            </CardBody>
          </AccordionItem>
          <AccordionItem title="Further Investigations" key="2"></AccordionItem>
        </Accordion>

        <div
          className="
              flex flex-row justify-around"
        >
          {submiting ? (
            <Button className="text-white bg-purple-400" isLoading isDisabled>
              Submitting
            </Button>
          ) : (
            <Button type="submit" className="text-white bg-purple-400">
              Submit
            </Button>
          )}
          <Button className="text-white bg-purple-400" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Admission_card;
