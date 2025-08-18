import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Phone, CreditCard, CheckCircle } from 'lucide-react';
import { format, addDays, setHours, setMinutes, isBefore } from 'date-fns';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM

  for (let hour = startHour; hour <= endHour; hour++) {
    const slotTime = setHours(setMinutes(date, 0), hour);
    slots.push({
      time: format(slotTime, 'h:mm a'),
      available: !isBefore(slotTime, new Date()) && Math.random() > 0.3 // Simulate availability
    });
  }

  return slots;
};

const SchedulingModal: React.FC<SchedulingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [meetingType, setMeetingType] = useState<'video' | 'phone'>('video');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    discountCode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const timeSlots = generateTimeSlots(selectedDate);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsProcessing(false);
    setIsBooked(true);
    
    // In a real implementation, you would:
    // 1. Validate the discount code
    // 2. Process the payment
    // 3. Create the calendar event
    // 4. Send confirmation emails
    // 5. Update the availability
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-[#FE02A1] transition-colors duration-200"
        >
          <X size={24} />
        </button>

        {isBooked ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-[#FE02A1] mx-auto mb-4" />
            <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-4">
              Meeting Scheduled!
            </h2>
            <p className="text-white/80 mb-6">
              A confirmation email has been sent with all the details.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 rounded-full mx-1 transition-colors duration-300 ${
                    s <= step ? 'bg-[#FE02A1]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {step === 1 && (
              <div>
                <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-6">
                  Select Date & Time
                </h2>
                
                {/* Date Selection */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[0, 1, 2, 3].map((offset) => {
                    const date = addDays(new Date(), offset);
                    return (
                      <button
                        key={offset}
                        onClick={() => handleDateSelect(date)}
                        className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                          format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                            ? 'border-[#FE02A1] bg-[#FE02A1] text-white'
                            : 'border-[rgba(254,2,161,0.3)] text-white/80 hover:border-[#FE02A1]'
                        }`}
                      >
                        <div className="text-sm">{format(date, 'EEE')}</div>
                        <div className="text-lg font-bold">{format(date, 'd')}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                        selectedTime === slot.time
                          ? 'border-[#FE02A1] bg-[#FE02A1] text-white'
                          : slot.available
                          ? 'border-[rgba(254,2,161,0.3)] text-white/80 hover:border-[#FE02A1]'
                          : 'border-white/10 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => selectedTime && setStep(2)}
                    disabled={!selectedTime}
                    className="px-6 py-3 bg-[#FE02A1] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-6">
                  Meeting Preferences
                </h2>

                <div className="space-y-6">
                  {/* Meeting Type */}
                  <div>
                    <label className="block text-white mb-2">Meeting Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setMeetingType('video')}
                        className={`flex items-center gap-2 p-4 rounded-lg border transition-all duration-300 ${
                          meetingType === 'video'
                            ? 'border-[#FE02A1] bg-[#FE02A1] text-white'
                            : 'border-[rgba(254,2,161,0.3)] text-white/80 hover:border-[#FE02A1]'
                        }`}
                      >
                        <Video className="w-5 h-5" />
                        Video Call
                      </button>
                      <button
                        onClick={() => setMeetingType('phone')}
                        className={`flex items-center gap-2 p-4 rounded-lg border transition-all duration-300 ${
                          meetingType === 'phone'
                            ? 'border-[#FE02A1] bg-[#FE02A1] text-white'
                            : 'border-[rgba(254,2,161,0.3)] text-white/80 hover:border-[#FE02A1]'
                        }`}
                      >
                        <Phone className="w-5 h-5" />
                        Phone Call
                      </button>
                    </div>
                  </div>

                  {/* Selected Time Summary */}
                  <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <Calendar className="w-5 h-5" />
                      {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="w-5 h-5" />
                      {selectedTime}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-6">
                  Complete Booking
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Discount Code (Optional)</label>
                    <input
                      type="text"
                      value={formData.discountCode}
                      onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })}
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
                    />
                  </div>

                  {/* Payment Summary */}
                  <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
                    <div className="flex justify-between text-white mb-2">
                      <span>Consultation (1 hour)</span>
                      <span>$2,500</span>
                    </div>
                    <div className="text-sm text-white/60">
                      Payment will be processed securely after discount code validation
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border border-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex items-center gap-2 px-6 py-3 bg-[#FE02A1] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Complete Booking
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SchedulingModal;