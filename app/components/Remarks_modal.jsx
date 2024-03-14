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
  Checkbox,
  Badge,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faFileLines,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function App(data) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { bed } = data;
  const [remarks, setRemarks] = useState(bed.remarks);
  const [remark, setRemark] = useState("");

  //get the number of pending remarks
  const pendingRemarks = remarks.filter(
    (remark) => remark.status === "pending"
  ).length;

  const handleStatusChange = (index) => {
    return async (e) => {
      const newRemarks = remarks.map((remark, i) => {
        if (i === index) {
          return { ...remark, status: e.target.checked ? "done" : "pending" };
        }
        return remark;
      });
      //setRemarks(newRemarks);
      setRemarks(newRemarks);
      const newBed = { ...bed, remarks: newRemarks };
      const res = await fetch("/api/edit", {
        method: "POST",
        body: JSON.stringify({ form: newBed }),
        "Content-Type": "application/json",
      });

      if (res.ok) {
        //setSubmiting(true);

        setTimeout(() => {
          console.log("Submitted");
          //onClose();
        });
      }
    };
  };

  const handleDeleteRemark = (index) => {
    return async () => {
      const newRemarks = remarks.filter((remark, i) => i !== index);
      console.log(newRemarks);
      setRemarks(newRemarks);
      const newBed = { ...bed, remarks: newRemarks };
      const res = await fetch("/api/edit", {
        method: "POST",
        body: JSON.stringify({ form: newBed }),
        "Content-Type": "application/json",
      });

      if (res.ok) {
        //setSubmiting(true);

        setTimeout(() => {
          console.log("Submitted");
          //onClose();
        }, 0);
      }
    };
  };

  const handleAddRemark = async () => {
    let remarkObject;
    if (bed.remarks) {
      remarkObject = [
        ...remarks,
        {
          remark: remark,
          timestamp: new Date().toISOString(),
          status: "pending",
        },
      ];
    } else {
      remarkObject = [
        {
          remark: remark,
          timestamp: new Date().toISOString(),
          status: "pending",
        },
      ];
    }
    setRemark("");
    setRemarks(remarkObject);
    const newBed = { ...bed, remarks: remarkObject };
    //console.log(newBed);
    const res = await fetch("/api/edit", {
      method: "POST",
      body: JSON.stringify({ form: newBed }),
      "Content-Type": "application/json",
    });

    if (res.ok) {
      //setSubmiting(true);

      //onClose();
      setTimeout(() => {
        console.log("Submitted");
        //onClose();
      }, 0);
    }
  };

  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
  };

  return (
    <>
      <Tooltip content="Remarks">
        <Badge
          isInvisible={
            !remarks.filter((remark) => remark.status === "pending").length > 0
          }
          color="danger"
          content={
            remarks.filter((remark) => remark.status === "pending").length
          }
        >
          <FontAwesomeIcon
            icon={faFileLines}
            size="sm"
            className="mr-2 flex hover:text-slate-500 hover:cursor-pointer"
            onClick={(e) => {
              console.log(remarks);
              onOpen();
            }}
          />
        </Badge>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Remarks</ModalHeader>
              <ModalBody>
                {remarks?.map((remark, index) => {
                  return (
                    <div
                      className="flex justify-between items-center"
                      key={index}
                    >
                      <Input
                        key={index}
                        label={`Remark ${index + 1}`}
                        value={remark.remark}
                        className="w-[80%]"
                      />
                      <Checkbox
                        isSelected={remark.status == "done"}
                        color={remark.status == "done" ? "success" : "error"}
                        onChange={handleStatusChange(index)}
                      ></Checkbox>
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="sm"
                        className="hover:cursor-pointer"
                        onClick={handleDeleteRemark(index)}
                      />
                    </div>
                  );
                })}
                <Input
                  label="Remarks"
                  name="remarkInput"
                  onChange={handleRemarkChange}
                  value={remark}
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
