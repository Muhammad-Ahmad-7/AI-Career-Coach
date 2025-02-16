'use client'
import { generateAiQuiz, saveQuizResult } from '@/actions/interview.api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useFetch from '@/hooks/useFetch'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import { toast } from 'sonner'
import QuizResult from './QuizResult'

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);

    const { isLoading: generatingQuiz, fn: generateQuizFn, data: quizData } = useFetch(generateAiQuiz);
    const { isLoading: savingResult, fn: savingResultFn, data: resultData, setData: setResultData } = useFetch(saveQuizResult);

    // console.log(resultData)

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null));
        }
    }, [quizData])

    const handleAnswer = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    }

    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setShowExplanation(false)
        } else {
            finishQuiz();
        }
    }

    const calculateScore = () => {
        let correct = 0;
        answers.forEach((ans, index) => {
            if (ans === quizData[index].correctAnswer) {
                correct++;
            }
        })

        return (correct / quizData.length) * 100;
    }

    const finishQuiz = async () => {
        let score = calculateScore();

        try {
            await savingResultFn(quizData, answers, score);
            toast.success("QUIZ COMPLETED!");
        } catch (error) {
            toast.error(error.message || "Failed to save Quiz result");
        }
    }

    if (generatingQuiz) {
        return (
            <BarLoader className="mt-4" width={"100%"} color="gray" />
        )
    }

    const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        generateQuizFn();
        setResultData(null);
    }

    if (resultData) {
        return (
            <div className='mx-2'>
                <QuizResult result={resultData} onStartNew={startNewQuiz} />
            </div>
        )
    }

    if (!quizData) {
        return (
            <Card>
                <CardHeader>
                    <CardDescription className='text-white'>Ready to test your knowledge</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>This quiz contains 10 questions specific to your industry and skills. Take your time and choose the best answer for each question.</p>
                </CardContent>
                <CardFooter>
                    <Button className='w-full' onClick={generateQuizFn}>
                        Start Quiz
                    </Button>
                </CardFooter>
            </Card>
        )
    }


    const question = quizData[currentQuestion];

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Question {currentQuestion + 1} of {quizData.length}
                </CardTitle>
                <CardDescription className='text-white'>Ready to test your knowledge</CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-lg font-medium'>{question?.question}</p>
                <RadioGroup
                    className="space-y-2"
                    onValueChange={handleAnswer}
                    value={answers[currentQuestion]}
                >
                    {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
                {
                    showExplanation && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                            <p className="font-medium">Explanation:</p>
                            <p className="text-muted-foreground">{question.explanation}</p>
                        </div>
                    )
                }
            </CardContent>
            <CardFooter className="flex justify-between">
                {!showExplanation && (
                    <Button
                        onClick={() => setShowExplanation(true)}
                        variant="outline"
                        disabled={!answers[currentQuestion]}
                    >
                        Show Explanation
                    </Button>
                )}
                <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion] || savingResult}
                    className="ml-auto"
                >
                    {savingResult && (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    {currentQuestion < quizData.length - 1
                        ? "Next Question"
                        : "Finish Quiz"}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Quiz
