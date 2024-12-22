"use client"
import { motion } from 'framer-motion';
import { GraduationCap, FileText, AlertCircle, ChevronRight, School } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ScholarshipPage = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen p-6 md:p-12">
            {/* Hero Section */}
            <motion.div
                className="max-w-6xl mx-auto mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    BuildUp Kasaragod Society Scholarship
                </h1> */}
                {/* <p className="text-lg text-muted-foreground">
                    An initiative to support students to pursue their college education
                </p> */}
            </motion.div>

            {/* Important Notice */}
            {/* <motion.div
                className="max-w-6xl mx-auto mb-12"
                {...fadeIn}
                transition={{ delay: 0.2 }}
            >
                <Alert>
                    <AlertCircle className="h-5 w-5" />
                    <AlertDescription>
                        Applications are currently under review. Updates will be sent via WhatsApp to your registered mobile number.
                    </AlertDescription>
                </Alert>
            </motion.div> */}

            {/* About Section */}
            <motion.div
                className="max-w-6xl mx-auto mb-12"
                {...fadeIn}
                transition={{ delay: 0.4 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <School className="h-6 w-6" />
                            About the Scholarship
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            BuildUp Kasaragod Society is an NGO constituted for the integrated development of Kasaragod District. The scholarship supports professional students from disadvantaged backgrounds in their pursuit of college education.
                        </p>
                        <div className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-2">Scholarship Details (2024-25)</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0" />
                                    <span>INR 10,000/- scholarship for the entire duration of undergraduate course</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0" />
                                    <span>Supports students who passed Grade XII with distinction</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Eligibility & Documents */}
            <motion.div
                className="max-w-6xl mx-auto grid grid-cols-1 gap-6 mb-12"
                {...fadeIn}
                transition={{ delay: 0.6 }}
            >
                <Card className='bg-green-100'>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                            <GraduationCap className="h-6 w-6" />
                            Eligibility
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-gray-800">
                        <p className="font-medium">Students from Kasaragod District who:</p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0" />
                                <span>Passed Grade XII from a local government or private school in 2024</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0" />
                                <span>Have secured admission for the academic year 2024-25 as a regular student in the
                                    first year of a recognised undergraduate degree with flexible Curriculum and Industry
                                    relevance at the time of application.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-green-100">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                            <FileText className="h-6 w-6" />
                            Required Documents
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-800">
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0" />
                                <span>CLEAR, READABLE and COLOURED SCANNED FILES of the following documents:</span>
                            </li>
                            <li className="ml-6 flex items-start gap-2">
                                <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0" />
                                <span>Copy of marksheets of Grade X and XII</span>
                            </li>
                            <li className="ml-6 flex items-start gap-2">
                                <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0" />
                                <span>Copy of Aadhaar Card</span>
                            </li>
                            <li className="ml-6 flex items-start gap-2">
                                <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0" />
                                <span>
                                    Any one of the following documents as proof of admission to college:
                                    <ul className="ml-6 mt-1 space-y-1">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0" />
                                            <span>(Provisional) admission certificate</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0" />
                                            <span>Bona fide certificate</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0" />
                                            <span>Fee receipt</span>
                                        </li>
                                    </ul>
                                </span>
                            </li>
                            <li className="ml-6 text-sm">
                                <span className="font-semibold">Note:</span> Ensure the proof of admission document displays:
                                <ul className="ml-6 mt-1 space-y-1">
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0" />
                                        <span>Applicant’s name</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0" />
                                        <span>College name</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0" />
                                        <span>Course start date/year of study</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0" />
                                        <span>Course type</span>
                                    </li>
                                </ul>
                                <p className="mt-1">
                                    It must be system-generated or printed on the official letterhead of the
                                    University/College with a seal and signature of the relevant authority.
                                </p>
                            </li>
                            <li className="ml-6 flex items-start gap-2">
                                <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0" />
                                <span>A passport-size photograph with a plain background (taken within the last 6 months)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0" />
                                <span>
                                    Scanned documents should be clearly visible, without any added elements
                                    like emojis or camera/app stamps.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0" />
                                <span>
                                    The Scholarship Portal will accept documents in PDF/PNG/JPG/JPEG format,
                                    with a file size less than 1.5 MB.
                                </span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

            </motion.div>


            {/* Apply Button */}
            < motion.div
                className="max-w-6xl mx-auto text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
            >
                <Button
                    size="lg"
                    className="text-white bg-primary rounded-full text-lg font-medium animate-pulse-custom px-8 py-6 hover:scale-110 transform transition  "
                    onClick={() => (window.location.href = '/scholarship/apply-scholarship')}
                >
                    Apply Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                </Button>

            </motion.div >
        </div >
    );
};

export default ScholarshipPage;