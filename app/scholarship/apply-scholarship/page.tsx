"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sendScholarshipApplication } from "@/lib/action-scholarship";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"

const SimpleScholarshipPage = () => {
    const [formData, setFormData] = useState({
        // Personal Info
        name: "",
        photo: null as File | null,
        dateOfBirth: "",
        gender: "",
        email: "",
        mobile: "",
        whatsapp: "",
        street: "",
        city: "",
        region: "",
        postalCode: "",
        state: "",
        // Education Details
        courseName: "",
        institutionName: "",
        admissionDate: "",
        collegeId: "",
        // Bank Details
        bankName: "",
        bankBranch: "",
        ifsc: "",
        accountNumber: "",
        accountHolder: "",
        panNumber: "",
        // Additional Info
        studyFurther: "",
        studyWish: "",
        hobbies: "",
        contribution: "",
        // Declaration
        declarationDate: "",
        declarationPlace: "",
        agreementChecked: false
    });
    const [formStatus, setFormStatus] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, files } = e.target as HTMLInputElement;
        if (name === "photo" && files && files[0]) {
            setFormData(prev => ({
                ...prev,
                photo: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleGenderChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            gender: value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            agreementChecked: checked
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus("Submitting application...");

        const formDataObj = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                // Handle file input (photo) separately
                if (key === 'photo' && value instanceof File) {
                    formDataObj.append(key, value);
                }
                // Handle boolean values by converting to string
                else if (typeof value === 'boolean') {
                    formDataObj.append(key, value.toString()); // 'true' or 'false'
                }
                // For all other types, append the value as a string
                else {
                    formDataObj.append(key, value.toString());
                }
            }
        });

        const response = await sendScholarshipApplication(formDataObj);
        if (response.success) {
            setFormStatus("Application submitted successfully!");
            setFormData({
                name: "",
                photo: null,
                dateOfBirth: "",
                gender: "",
                email: "",
                mobile: "",
                whatsapp: "",
                street: "",
                city: "",
                region: "",
                postalCode: "",
                state: "",
                courseName: "",
                institutionName: "",
                admissionDate: "",
                collegeId: "",
                bankName: "",
                bankBranch: "",
                ifsc: "",
                accountNumber: "",
                accountHolder: "",
                panNumber: "",
                studyFurther: "",
                studyWish: "",
                hobbies: "",
                contribution: "",
                declarationDate: "",
                declarationPlace: "",
                agreementChecked: false
            });
            const fileInput = document.getElementById('photo') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        } else {
            setFormStatus("Failed to submit application. Please try again.");
        }
    };


    return (
        <div className="min-h-screen bg-background flex items-center justify-center md:p-8 p-2">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-7xl"
            >
                <Card
                    className="p-6 bg-[#1F2937]/30">
                    <CardContent className="space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-light">Scholarship Application</h2>
                            <p className="text-muted-foreground text-sm">
                                Please fill in your details below
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Personal Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">
                                            Full Name *
                                        </label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Your full name"
                                            className="bg-[#030712]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="dateOfBirth" className="text-sm font-medium">
                                            Date of Birth *
                                        </label>
                                        <Input
                                            type="date"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Gender *
                                        </label>
                                        <Select
                                            value={formData.gender}
                                            onValueChange={handleGenderChange}
                                            required
                                        >
                                            <SelectTrigger className="bg-[#030712]">
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>                                       </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="photo" className="text-sm font-medium">
                                            Photo *
                                        </label>
                                        <Input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            onChange={handleInputChange}
                                            required
                                            accept="image/*"
                                            className="bg-[#030712]"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            JPG or PNG format, max 5MB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4 pt-10">
                                <h3 className="text-lg font-semibold">Contact Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email Address *
                                        </label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="your.email@example.com"
                                            className="bg-[#030712]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="mobile" className="text-sm font-medium">
                                            Mobile Number *
                                        </label>
                                        <Input
                                            type="tel"
                                            id="mobile"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Your mobile number"
                                            className="bg-[#030712]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="whatsapp" className="text-sm font-medium">
                                            WhatsApp Number
                                        </label>
                                        <Input
                                            type="tel"
                                            id="whatsapp"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleInputChange}
                                            placeholder="Your WhatsApp number"
                                            className="bg-[#030712]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address Information */}
                            <div className="space-y-4 pt-10">
                                <h3 className="text-lg font-semibold">Address Information</h3>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="street" className="text-sm font-medium">
                                            Street Address *
                                        </label>
                                        <Input
                                            type="text"
                                            id="street"
                                            name="street"
                                            value={formData.street}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Street address"
                                            className="bg-[#030712]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="city" className="text-sm font-medium">
                                                City *
                                            </label>
                                            <Input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="City"
                                                className="bg-[#030712]"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="region" className="text-sm font-medium">
                                                Region
                                            </label>
                                            <Input
                                                type="text"
                                                id="region"
                                                name="region"
                                                value={formData.region}
                                                onChange={handleInputChange}
                                                placeholder="Region"
                                                className="bg-[#030712]"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="postalCode" className="text-sm font-medium">
                                                Postal Code *
                                            </label>
                                            <Input
                                                type="text"
                                                id="postalCode"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Postal / ZIP code"
                                                className="bg-[#030712]"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="state" className="text-sm font-medium">
                                                State *
                                            </label>
                                            <Input
                                                type="text"
                                                id="state"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="State"
                                                className="bg-[#030712]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Education Details */}
                            <div className="space-y-4 pt-10">
                                <h3 className="text-lg font-semibold">Education Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="courseName" className="text-sm font-medium">
                                            Course Name *
                                        </label>
                                        <Input
                                            type="text"
                                            id="courseName"
                                            name="courseName"
                                            value={formData.courseName}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter course name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="institutionName" className="text-sm font-medium">
                                            Name & Address of the Institution *
                                        </label>
                                        <Input
                                            type="text"
                                            id="institutionName"
                                            name="institutionName"
                                            value={formData.institutionName}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter institution name and address"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="admissionDate" className="text-sm font-medium">
                                            Date of Admission *
                                        </label>
                                        <Input
                                            type="date"
                                            id="admissionDate"
                                            name="admissionDate"
                                            value={formData.admissionDate}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Select admission date"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="collegeId" className="text-sm font-medium">
                                            College ID Details *
                                        </label>
                                        <Input
                                            type="text"
                                            id="collegeId"
                                            name="collegeId"
                                            value={formData.collegeId}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter college ID details"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bank Details */}
                            <div className="space-y-4 pt-10">
                                <h3 className="text-lg font-semibold">Bank Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="bankName" className="text-sm font-medium">
                                            Bank Name *
                                        </label>
                                        <Input
                                            type="text"
                                            id="bankName"
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter bank name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="bankBranch" className="text-sm font-medium">
                                            Bank Branch *
                                        </label>
                                        <Input
                                            type="text"
                                            id="bankBranch"
                                            name="bankBranch"
                                            value={formData.bankBranch}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter bank branch"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="ifsc" className="text-sm font-medium">
                                            Branch IFSC *
                                        </label>
                                        <Input
                                            type="text"
                                            id="ifsc"
                                            name="ifsc"
                                            value={formData.ifsc}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter IFSC code"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="accountNumber" className="text-sm font-medium">
                                            A/c No. *
                                        </label>
                                        <Input
                                            type="text"
                                            id="accountNumber"
                                            name="accountNumber"
                                            value={formData.accountNumber}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter account number"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="accountHolder" className="text-sm font-medium">
                                            A/c Holder Name *
                                        </label>
                                        <Input
                                            type="text"
                                            id="accountHolder"
                                            name="accountHolder"
                                            value={formData.accountHolder}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter account holder name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="panNumber" className="text-sm font-medium">
                                            PAN Number *
                                        </label>
                                        <Input
                                            type="text"
                                            id="panNumber"
                                            name="panNumber"
                                            value={formData.panNumber}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter PAN number"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4 pt-10">
                                <h3 className="text-lg font-semibold">Additional Information</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            You intend to study further: Yes/No, if yes, what is your wish:
                                        </label>
                                        <Textarea
                                            id="studyFurther"
                                            name="studyFurther"
                                            value={formData.studyFurther}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter your wish if you intend to study further"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="hobbies" className="text-sm font-medium">
                                            Your Hobbies *
                                        </label>
                                        <Textarea
                                            id="hobbies"
                                            name="hobbies"
                                            value={formData.hobbies}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter your hobbies"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="contribution" className="text-sm font-medium">
                                            Your contribution for the integrated development of Kasaragod District *
                                        </label>
                                        <Textarea
                                            id="contribution"
                                            name="contribution"
                                            value={formData.contribution}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-[#030712]"
                                            placeholder="Enter your contribution for Kasaragod District"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="declarationDate" className="text-sm font-medium">
                                                Date *
                                            </label>
                                            <Input
                                                type="date"
                                                id="declarationDate"
                                                name="declarationDate"
                                                value={formData.declarationDate}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-[#030712]"
                                                placeholder="Select declaration date"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="declarationPlace" className="text-sm font-medium">
                                                Place *
                                            </label>
                                            <Input
                                                type="text"
                                                id="declarationPlace"
                                                name="declarationPlace"
                                                value={formData.declarationPlace}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-[#030712]"
                                                placeholder="Enter declaration place"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="agreement"
                                            checked={formData.agreementChecked}
                                            onCheckedChange={handleCheckboxChange}
                                            required
                                        />
                                        <label htmlFor="agreement" className="text-sm">
                                            I hereby declare that the information provided above is true to the best of my knowledge and allow the usage of my details to cross verification with the Studying Institution.
                                        </label>
                                    </div>
                                </div>
                            </div>



                            {formStatus && (
                                <p className={`text-center ${formStatus.includes('successfully') ? 'text-green-500' : 'text-muted-foreground'}`}>
                                    {formStatus}
                                </p>
                            )}

                            <Button type="submit" className="w-full flex items-center justify-center space-x-2">
                                <Send className="w-5 h-5 mr-2" />
                                Submit Application
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default SimpleScholarshipPage;