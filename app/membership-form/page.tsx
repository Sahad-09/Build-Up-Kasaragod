"use client";
import React, { useRef, useState } from "react";
import { sendEmail } from "../../lib/actions";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserPlus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="h-12 w-full rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 md:w-auto px-6"
        >
            <UserPlus className="w-5 h-5" /> {/* Icon size can be adjusted */}
            {pending ? "Submitting Application..." : "Submit Application"}
        </Button>
    );
}

export default function MembershipForm() {
    const [status, setStatus] = useState<"success" | "error" | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(formData: FormData) {
        const result = await sendEmail(formData);

        if (result.success) {
            setStatus("success");
            formRef.current?.reset();
        } else {
            setStatus("error");
        }
    }

    return (
        <div className="space-y-6 p-6 md:p-8 lg:p-12">
            {/* Intro Section */}
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Welcome to Our Membership Application Form</h1>
                <p>
                    We are excited about your interest in our work and would be happy to welcome you
                    to our noble movement. Please review the membership eligibility criteria
                    specified below before filling out the form.{" "}
                    <span className="font-semibold">All fields are compulsory</span>, and incomplete
                    forms may not be processed.
                </p>
            </div>

            {/* Membership Details */}
            <div className="space-y-4 p-6 border rounded-md bg-green-100">
                <h2 className="text-lg font-semibold text-gray-900">Membership Eligibility/Rules</h2>
                <ul className="list-disc pl-6 text-gray-800">
                    <li>
                        Any Indian citizen, aged 21 years or older, and of sound mind, who has not
                        been involved in any criminal or civil offense is eligible for membership.
                    </li>
                    <li>
                        Membership is open to all, irrespective of religion, caste, or sectarian
                        considerations.
                    </li>
                    <li>
                        Members must adhere to the organization&apos;s bylaws and decisions of the
                        Governing Board and AGM.
                    </li>
                </ul>
            </div>

            {/* Form Section */}
            <form
                style={{
                    backgroundImage: `url('/grain.png')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
                ref={formRef} action={handleSubmit} className="space-y-4 p-6 border rounded-md ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Membership Category - Full Width */}
                    <div className="md:col-span-2">
                        <Label>Membership Category</Label>
                        <RadioGroup
                            name="membershipCategory"
                            required
                            className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Life Membership" id="lifeMembership" />
                                <Label htmlFor="lifeMembership">Life Membership</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Associate Membership" id="associateMembership" />
                                <Label htmlFor="associateMembership">Associate Membership</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Honorary Membership" id="honoraryMembership" />
                                <Label htmlFor="honoraryMembership">Honorary Membership</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Full Name and Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input type="text" id="name" name="name" required className="bg-[#030712]" />
                        </div>

                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Select name="gender" required>
                                <SelectTrigger className="bg-[#030712]">
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#030712]">
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input type="date" id="dob" name="dob" required className="bg-[#030712]" />
                    </div>

                    <div>
                        <Label htmlFor="fatherName">Father&apos;s Name</Label>
                        <Input type="text" id="fatherName" name="fatherName" required className="bg-[#030712]" />
                    </div>

                    {/* Identity and Contact Information */}
                    <div>
                        <Label htmlFor="aadhaar">Aadhaar Number</Label>
                        <Input type="text" id="aadhaar" name="aadhaar" required className="bg-[#030712]" />
                    </div>

                    <div>
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input type="tel" id="mobile" name="mobile" required className="bg-[#030712]" />
                    </div>

                    <div>
                        <Label htmlFor="whatsapp">WhatsApp</Label>
                        <Input type="tel" id="whatsapp" name="whatsapp" className="bg-[#030712]" />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" name="email" required className="bg-[#030712]" />
                    </div>

                    {/* Optional Personal Details */}
                    <div>
                        <Label htmlFor="spouse">Spouse</Label>
                        <Input type="text" id="spouse" name="spouse" className="bg-[#030712]" />
                    </div>

                    <div>
                        <Label htmlFor="qualification">Qualification</Label>
                        <Input type="text" id="qualification" name="qualification" className="bg-[#030712]" />
                    </div>

                    <div>
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input type="text" id="occupation" name="occupation" className="bg-[#030712]" />
                    </div>

                    <div>
                        <Label htmlFor="country">Country of Residence</Label>
                        <Input type="text" id="country" name="country" className="bg-[#030712]" />
                    </div>

                    {/* Address and Additional Information */}
                    <div className="md:col-span-2">
                        <Label htmlFor="address">Permanent Address</Label>
                        <Textarea id="address" name="address" required className="bg-[#030712]" />
                    </div>

                    <div className="md:col-span-2">
                        <Label htmlFor="hobbies">Hobbies</Label>
                        <Textarea id="hobbies" name="hobbies" className="bg-[#030712]" />
                    </div>

                    <div className="md:col-span-2">
                        <Label htmlFor="awards">Awards</Label>
                        <Textarea id="awards" name="awards" className="bg-[#030712]" />
                    </div>
                </div>

                <SubmitButton />

                {status === "success" && (
                    <Alert variant="default" className="text-green-500">
                        <AlertDescription>Message sent successfully!</AlertDescription>
                    </Alert>
                )}

                {status === "error" && (
                    <Alert variant="destructive" className="text-red-500">
                        <AlertDescription>Failed to send message. Please try again.</AlertDescription>
                    </Alert>
                )}
            </form>
        </div>


    );
}
