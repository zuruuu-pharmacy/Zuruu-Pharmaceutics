"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Send, Bot, User, BookOpen, FlaskConical, Heart, Calculator } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  question: string;
  category: 'pharmacology' | 'chemistry' | 'clinical' | 'calculations';
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI pharmacy tutor. I can help you with pharmacology, drug interactions, calculations, and clinical scenarios. What would you like to learn about today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions: QuickQuestion[] = [
    {
      id: '1',
      question: 'What is the mechanism of Metformin?',
      category: 'pharmacology'
    },
    {
      id: '2',
      question: 'How do ACE inhibitors work?',
      category: 'pharmacology'
    },
    {
      id: '3',
      question: 'Explain drug-drug interactions',
      category: 'clinical'
    },
    {
      id: '4',
      question: 'What are the side effects of statins?',
      category: 'pharmacology'
    },
    {
      id: '5',
      question: 'How to calculate drug dosages?',
      category: 'calculations'
    },
    {
      id: '6',
      question: 'What is the pH of aspirin?',
      category: 'chemistry'
    }
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(message),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('metformin')) {
      return 'Metformin is a biguanide antidiabetic medication. Its primary mechanism of action includes:\n\n1. **Decreases hepatic glucose production** by inhibiting gluconeogenesis\n2. **Improves insulin sensitivity** in peripheral tissues\n3. **Reduces intestinal glucose absorption**\n4. **Activates AMP-activated protein kinase (AMPK)**\n\nIt\'s the first-line treatment for Type 2 diabetes and has minimal risk of hypoglycemia. Common side effects include gastrointestinal symptoms like nausea and diarrhea.';
    }
    
    if (message.includes('ace inhibitor') || message.includes('ace inhibitors')) {
      return 'ACE inhibitors work by blocking the angiotensin-converting enzyme (ACE), which:\n\n1. **Prevents conversion** of angiotensin I to angiotensin II\n2. **Reduces vasoconstriction** and blood pressure\n3. **Decreases aldosterone secretion**\n4. **Reduces sodium and water retention**\n5. **Increases bradykinin levels** (causing dry cough as side effect)\n\nCommon examples include lisinopril, enalapril, and captopril. They\'re used for hypertension, heart failure, and diabetic nephropathy.';
    }
    
    if (message.includes('interaction') || message.includes('drug-drug')) {
      return 'Drug-drug interactions occur when one medication affects the activity of another. Types include:\n\n**Pharmacokinetic interactions:**\n- CYP enzyme inhibition/induction\n- Protein binding displacement\n- Absorption changes\n\n**Pharmacodynamic interactions:**\n- Additive effects (increased bleeding with warfarin + aspirin)\n- Antagonistic effects\n- Synergistic effects\n\nAlways check for interactions before dispensing medications, especially with narrow therapeutic index drugs.';
    }
    
    if (message.includes('statin') || message.includes('statins')) {
      return 'Statins (HMG-CoA reductase inhibitors) are cholesterol-lowering medications. Common side effects include:\n\n**Common:**\n- Muscle aches and pains\n- Digestive problems\n- Liver enzyme elevation\n\n**Rare but serious:**\n- Rhabdomyolysis (muscle breakdown)\n- Liver damage\n- Memory problems\n\n**Drug interactions to watch:**\n- CYP3A4 inhibitors (grapefruit juice, clarithromycin)\n- Warfarin (increased bleeding risk)\n\nMonitor liver function tests and creatine kinase levels.';
    }
    
    if (message.includes('calculate') || message.includes('dosage')) {
      return 'Drug dosage calculations follow these key formulas:\n\n**Basic Formula:**\nDose = (Desired dose / Available dose) × Volume\n\n**Weight-based dosing:**\nDose = Patient weight (kg) × Dose per kg\n\n**Body Surface Area (BSA):**\nBSA = √[(Height × Weight) / 3600]\nDose = BSA × Dose per m²\n\n**Example:** Patient weighs 70kg, prescribed 5mg/kg of drug available as 250mg/5ml:\nDose = 70kg × 5mg/kg = 350mg\nVolume = (350mg / 250mg) × 5ml = 7ml';
    }
    
    if (message.includes('ph') || message.includes('aspirin')) {
      return 'Aspirin (acetylsalicylic acid) has important pH characteristics:\n\n**pH Properties:**\n- pKa = 3.5 (weak acid)\n- More ionized in basic conditions\n- Better absorption in acidic stomach\n\n**Clinical significance:**\n- Enteric-coated forms protect stomach lining\n- Alkalinization of urine increases excretion\n- pH affects drug distribution and elimination\n\n**Formulation considerations:**\n- Buffered aspirin reduces gastric irritation\n- Enteric coating prevents gastric breakdown';
    }
    
    return 'That\'s a great question! I\'m here to help you learn pharmacy concepts. Could you be more specific about what you\'d like to know? I can help with:\n\n• Drug mechanisms and pharmacology\n• Drug interactions and side effects\n• Dosage calculations\n• Clinical scenarios\n• Pharmaceutical chemistry\n• Study strategies\n\nFeel free to ask me anything!';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pharmacology': return <FlaskConical className="w-4 h-4" />;
      case 'chemistry': return <BookOpen className="w-4 h-4" />;
      case 'clinical': return <Heart className="w-4 h-4" />;
      case 'calculations': return <Calculator className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pharmacology': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'chemistry': return 'bg-green-100 text-green-800 border-green-200';
      case 'clinical': return 'bg-red-100 text-red-800 border-red-200';
      case 'calculations': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Zap className="w-8 h-8 text-yellow-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Assistant Helper</h2>
          <p className="text-gray-600">Intelligent AI tutor for pharmacy questions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Tutor</h3>
                <p className="text-sm text-gray-600">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-blue-100' : 'bg-yellow-100'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Bot className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                placeholder="Ask me anything about pharmacy..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h3>
          <div className="space-y-3">
            {quickQuestions.map((question) => (
              <button
                key={question.id}
                onClick={() => handleSendMessage(question.question)}
                className={`w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors ${getCategoryColor(question.category)}`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {getCategoryIcon(question.category)}
                  <span className="text-xs font-medium capitalize">{question.category}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{question.question}</p>
              </button>
            ))}
          </div>

          {/* Study Tips */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Study Tip</h4>
            <p className="text-sm text-blue-800">
              Try asking specific questions about drug mechanisms, interactions, or calculations for detailed explanations!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;
