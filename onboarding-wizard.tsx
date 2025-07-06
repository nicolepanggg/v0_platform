"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Check, Users, Building, Target, Settings, User } from "lucide-react"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  company: string

  // Company Details
  companySize: string
  role: string
  industry: string

  // Use Case
  primaryGoal: string
  currentTools: string[]
  challenges: string

  // Team Setup
  teamSize: string
  inviteEmails: string[]

  // Preferences
  notifications: string[]
  features: string[]
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  companySize: "",
  role: "",
  industry: "",
  primaryGoal: "",
  currentTools: [],
  challenges: "",
  teamSize: "",
  inviteEmails: [],
  notifications: [],
  features: [],
}

const steps = [
  { id: 1, title: "Personal Info", icon: User, description: "Tell us about yourself" },
  { id: 2, title: "Company", icon: Building, description: "Your company details" },
  { id: 3, title: "Use Case", icon: Target, description: "How you'll use our product" },
  { id: 4, title: "Team Setup", icon: Users, description: "Invite your team" },
  { id: 5, title: "Preferences", icon: Settings, description: "Customize your experience" },
]

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [inviteEmail, setInviteEmail] = useState("")

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addInviteEmail = () => {
    if (inviteEmail && !formData.inviteEmails.includes(inviteEmail)) {
      updateFormData("inviteEmails", [...formData.inviteEmails, inviteEmail])
      setInviteEmail("")
    }
  }

  const removeInviteEmail = (email: string) => {
    updateFormData(
      "inviteEmails",
      formData.inviteEmails.filter((e) => e !== email),
    )
  }

  const toggleArrayItem = (field: keyof FormData, item: string) => {
    const currentArray = formData[field] as string[]
    const newArray = currentArray.includes(item) ? currentArray.filter((i) => i !== item) : [...currentArray, item]
    updateFormData(field, newArray)
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  const progress = (currentStep / steps.length) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="john@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData("company", e.target.value)}
                placeholder="Acme Inc."
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select value={formData.companySize} onValueChange={(value) => updateFormData("companySize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-1000">201-1000 employees</SelectItem>
                  <SelectItem value="1000+">1000+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Select value={formData.role} onValueChange={(value) => updateFormData("role", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="founder">Founder/CEO</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primaryGoal">Primary Goal</Label>
              <Select value={formData.primaryGoal} onValueChange={(value) => updateFormData("primaryGoal", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="What's your main goal?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="productivity">Increase productivity</SelectItem>
                  <SelectItem value="collaboration">Improve collaboration</SelectItem>
                  <SelectItem value="automation">Automate processes</SelectItem>
                  <SelectItem value="analytics">Better analytics</SelectItem>
                  <SelectItem value="growth">Scale the business</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Current Tools (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Slack", "Notion", "Trello", "Asana", "Jira", "Monday.com", "Airtable", "Google Workspace"].map(
                  (tool) => (
                    <div key={tool} className="flex items-center space-x-2">
                      <Checkbox
                        id={tool}
                        checked={formData.currentTools.includes(tool)}
                        onCheckedChange={() => toggleArrayItem("currentTools", tool)}
                      />
                      <Label htmlFor={tool} className="text-sm">
                        {tool}
                      </Label>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenges">Current Challenges</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => updateFormData("challenges", e.target.value)}
                placeholder="What challenges are you facing that our product could help solve?"
                rows={3}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teamSize">Expected Team Size</Label>
              <Select value={formData.teamSize} onValueChange={(value) => updateFormData("teamSize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="How many people will use this?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="just-me">Just me</SelectItem>
                  <SelectItem value="2-5">2-5 people</SelectItem>
                  <SelectItem value="6-15">6-15 people</SelectItem>
                  <SelectItem value="16-50">16-50 people</SelectItem>
                  <SelectItem value="50+">50+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Invite Team Members</Label>
              <div className="flex gap-2">
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  onKeyPress={(e) => e.key === "Enter" && addInviteEmail()}
                />
                <Button type="button" onClick={addInviteEmail} variant="outline">
                  Add
                </Button>
              </div>
              {formData.inviteEmails.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Invited members:</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.inviteEmails.map((email) => (
                      <Badge
                        key={email}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeInviteEmail(email)}
                      >
                        {email} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Notification Preferences</Label>
              <div className="space-y-2">
                {["Email updates", "In-app notifications", "Weekly digest", "Product announcements"].map(
                  (notification) => (
                    <div key={notification} className="flex items-center space-x-2">
                      <Checkbox
                        id={notification}
                        checked={formData.notifications.includes(notification)}
                        onCheckedChange={() => toggleArrayItem("notifications", notification)}
                      />
                      <Label htmlFor={notification} className="text-sm">
                        {notification}
                      </Label>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Features to Enable</Label>
              <div className="space-y-2">
                {["Advanced analytics", "API access", "Custom integrations", "Priority support"].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => toggleArrayItem("features", feature)}
                    />
                    <Label htmlFor={feature} className="text-sm">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Welcome to SaaS Platform</h1>
          <Badge variant="outline">
            {currentStep} of {steps.length}
          </Badge>
        </div>
        <Progress value={progress} className="mb-4" />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    currentStep > step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === step.id
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5" })}
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        {currentStep === steps.length ? (
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            Complete Setup
            <Check className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={nextStep} className="flex items-center gap-2">
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
