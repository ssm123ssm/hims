import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Input,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { set } from "mongoose";

export default function App(data) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { bed } = data;
  const [remarks, setRemarks] = useState(bed.remarks);
  const [remark, setRemark] = useState("");

  const handleAddRemark = async () => {
    let remarkObject;
    if (bed.remarks) {
      remarkObject = [
        ...bed.remarks,
        { remark: remark, timestamp: new Date().toISOString() },
      ];
    } else {
      remarkObject = [{ remark: remark, timestamp: new Date().toISOString() }];
    }
    const newBed = { ...bed, remarks: remarkObject };
    console.log(newBed);
    const res = await fetch("/api/edit", {
      method: "POST",
      body: JSON.stringify({ form: newBed }),
      "Content-Type": "application/json",
    });

    if (res.ok) {
      //setSubmiting(true);
      setRemarks(remarkObject);
      setTimeout(() => {
        console.log("Submitted");
        onClose();
      }, 0);
    }
  };

  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
  };

  return (
    <>
      <Tooltip content="Remarks">
        <FontAwesomeIcon
          icon={faFileLines}
          size="sm"
          className="mr-2 flex hover:text-slate-500 hover:cursor-pointer"
          onClick={(e) => {
            console.log(remarks);
            onOpen();
          }}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Remarks</ModalHeader>
              <ModalBody>
                {remarks?.map((remark, index) => {
                  return (
                    <Input
                      key={index}
                      label={`Remark ${index + 1}`}
                      value={remark.remark}
                    />
                  );
                })}
                <Input
                  label="Remarks"
                  name="remarkInput"
                  onChange={handleRemarkChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleAddRemark}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
