import { LightningElement, api, wire,track } from "lwc";
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import myImage from '@salesforce/resourceUrl/Haulbrooke';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


const FIELDS = [
    'Inspection_Sheet__c.Shop_Name__c',
    'Inspection_Sheet__c.Name_Of_Motor_Carrier__c',
    'Inspection_Sheet__c.Date__c',
    'Inspection_Sheet__c.WFS_PO__c',
    'Inspection_Sheet__c.Mileage__c',
    'Inspection_Sheet__c.Unit__c',
    'Inspection_Sheet__c.VIN__c',
    'Inspection_Sheet__c.APM_Dry_Service__c',
    'Inspection_Sheet__c.BPM_Wet_Service__c',
    'Inspection_Sheet__c.Inspect_Air_Cleaners_and_Advise__c',
    'Inspection_Sheet__c.Grease_All_Fittings_and_Fifth_Wheel__c',
    'Inspection_Sheet__c.Check_and_Fill_All_Fluids__c',
    'Inspection_Sheet__c.Adjust_Brakes_As_Needed__c',
    'Inspection_Sheet__c.Check_Regular_Coolant__c',
    'Inspection_Sheet__c.DCA_Reading__c',
    'Inspection_Sheet__c.ppm__c',
    'Inspection_Sheet__c.Degree_Reading__c',
    'Inspection_Sheet__c.Extended_Life_Coolant_Check_FPL__c',
    'Inspection_Sheet__c.Ensure_All_Tires_Are_Filled_To_100_PSI__c',
    'Inspection_Sheet__c.Glad_Hands__c',
    'Inspection_Sheet__c.Service_Brakes__c',
    'Inspection_Sheet__c.Parking_Brake__c',
    'Inspection_Sheet__c.Brake_Drums_or_Rotors__c',
    'Inspection_Sheet__c.Hoses_Spacing_Chaffing__c',
    'Inspection_Sheet__c.Brake_Tubing__c',
    'Inspection_Sheet__c.Tractor_Protection_Valve__c',
    'Inspection_Sheet__c.Air_Compressor__c',
    'Inspection_Sheet__c.Electric_Brakes__c',
    'Inspection_Sheet__c.Hydraulic_Brakes__c',
    'Inspection_Sheet__c.Vacuum_Systems__c',
    'Inspection_Sheet__c.Pintle_Hooks__c', 
    'Inspection_Sheet__c.Saddle_Mounts__c', 
    'Inspection_Sheet__c.Sliding_Mechanism__c', 
    'Inspection_Sheet__c.Fifth_Wheel_Locks_Adjustment__c',      
    'Inspection_Sheet__c.Not_Leaking__c',
    'Inspection_Sheet__c.Won_t_burn__c',
    'Inspection_Sheet__c.Wipers__c',
    'Inspection_Sheet__c.WindShield__c',
    'Inspection_Sheet__c.No_Visible_Leaks__c',
    'Inspection_Sheet__c.Filler_Cap_Not_Missing__c',
    'Inspection_Sheet__c.Tank_Securely_Attached__c',
    'Inspection_Sheet__c.All_Devices__c',
    'Inspection_Sheet__c.Conspicuity_Tape__c',
    'Inspection_Sheet__c.Protection_Against_Shifting_Cargo__c',
    'Inspection_Sheet__c.Condition_Of_Loading__c',
    'Inspection_Sheet__c.Steering_Wheel_Free_Play__c',
    'Inspection_Sheet__c.Steering_Column__c',
    'Inspection_Sheet__c.Front_Axie_Beam_Components__c',
    'Inspection_Sheet__c.Steering_Gear_Box__c',
    'Inspection_Sheet__c.Pitman_Arm__c',
    'Inspection_Sheet__c.Power_Steering__c',
    'Inspection_Sheet__c.Ball_and_Socket_Joints__c',
    'Inspection_Sheet__c.Tie_Rods_and_Drag_Links__c',
    'Inspection_Sheet__c.Steering_System__c',
    'Inspection_Sheet__c.Nuts__c',
    'Inspection_Sheet__c.Frame_Members__c',
    'Inspection_Sheet__c.Tire_and_Wheel_Clearance__c',
    'Inspection_Sheet__c.Adjustable_Axle_Assemblies__c',
    'Inspection_Sheet__c.Damage__c', 
    'Inspection_Sheet__c.Electrical__c', 
    'Inspection_Sheet__c.Box_Skin__c', 
    'Inspection_Sheet__c.U_Bolts_Torque_50_llb_ft__c', 
    'Inspection_Sheet__c.Inspect_Welds_For_Cracking__c', 
    'Inspection_Sheet__c.Door_Roller_Inspect_and_Lube__c', 
    'Inspection_Sheet__c.Hinge_Inspect_and_Lube__c', 
    'Inspection_Sheet__c.Door_Operation_Seals__c',
    'Inspection_Sheet__c.Springs_Air_Bags_Height__c',
    'Inspection_Sheet__c.Spring_Hangers__c',
    'Inspection_Sheet__c.Front_U_Bolt_Torque_270_360_lb_ft__c',
    'Inspection_Sheet__c.Rear_U_Bolt_Torque_420_500_lb_ft__c',
    'Inspection_Sheet__c.Torque_Radius_or_Tracking_Components__c',
    'Inspection_Sheet__c.Inspect_Replace_Cabin_Air_Filter__c',
    'Inspection_Sheet__c.Lock_or_Side_Ring__c',
    'Inspection_Sheet__c.Welds__c',
    'Inspection_Sheet__c.Wheels_and_Rims__c',
    'Inspection_Sheet__c.Studs_and_Lug_Nuts__c',
    'Inspection_Sheet__c.Wheel_Bearings__c',
    'Inspection_Sheet__c.Axle_Seals__c',
    'Inspection_Sheet__c.Mudflaps__c',
    'Inspection_Sheet__c.Triangles__c',
    'Inspection_Sheet__c.Extinguisher__c',
    'Inspection_Sheet__c.Placards_Holders__c',
    'Inspection_Sheet__c.Horn__c',
    'Inspection_Sheet__c.Steering_Axle__c',
    'Inspection_Sheet__c.All_Other_Tires__c',
    'Inspection_Sheet__c.Completed__c',
    'Inspection_Sheet__c.Does_the_DOT_Inspection_Decal_Expire__c',
    'Inspection_Sheet__c.Completed_DOT_Inspection__c',
    'Inspection_Sheet__c.DOT_Inspection_Expiration_Date__c',
    'Inspection_Sheet__c.Does_the_State_Inspection_Decal_Expire__c',
    'Inspection_Sheet__c.Completed_State_Inspection__c',
    'Inspection_Sheet__c.State_Inspection_Sticker_Expiration_Date__c',
    'Inspection_Sheet__c.Comments__c',
    'Inspection_Sheet__c.Digital_Signature__c',
    'Inspection_Sheet__c.Printed_Name_of_Inspector__c',
    'Inspection_Sheet__c.Signature_of_Inspector__c',

    'Inspection_Sheet__c.LF_Tires__c',
    'Inspection_Sheet__c.LF_Brakes__c',
    'Inspection_Sheet__c.LFO_Tires__c',
    'Inspection_Sheet__c.LFO_Brakes__c',
    'Inspection_Sheet__c.LFI_Tires__c',
    'Inspection_Sheet__c.LFI_Brakes__c',
    'Inspection_Sheet__c.LRO_Tires__c',
    'Inspection_Sheet__c.LRO_Brakes__c',
    'Inspection_Sheet__c.LRI_Tires__c',
    'Inspection_Sheet__c.LRI_Brakes__c',

    'Inspection_Sheet__c.RF_Tires__c',
    'Inspection_Sheet__c.RF_Brakes__c',
    'Inspection_Sheet__c.RFO_Tires__c',
    'Inspection_Sheet__c.RFO_Brakes__c',
    'Inspection_Sheet__c.RFI_Tiers__c',
    'Inspection_Sheet__c.RFI_Breaks__c',
    'Inspection_Sheet__c.RRO_Tires__c',
    'Inspection_Sheet__c.RRO_Breaks__c',
    'Inspection_Sheet__c.RRI_Tires__c',
    'Inspection_Sheet__c.RRI_Brakes__c'

];
export default class PPM_Sheet extends NavigationMixin(LightningElement) {
    myImageUrl = myImage;
    @api recordId;
    @track fields = {};

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    loadRecord({ error, data }) {
        console.log('value========='+this.recordId);
        if (data) {
            this.fields = Object.fromEntries(
                Object.entries(data.fields).map(([key, value]) => [key, value.value])
            );
        } else if (error) {
            console.error("Error fetching record data: ", error);
        }
    }
    
    get apmImage() {
        return this.fields.APM_Dry_Service__c
            ? '/resource/Checkbox_With_Tick' 
            : '/resource/Checkbox_Without_Tick';
    }
    get bpmImage() {
        return  this.fields.BPM_Wet_Service__c
            ? '/resource/Checkbox_With_Tick' 
            : '/resource/Checkbox_Without_Tick';
    }
    get airCleanerImage() { 
        return this.fields.Inspect_Air_Cleaners_and_Advise__c 
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick'; 
    }
    get greaseFittingsImage() {
         return this.fields.Grease_All_Fittings_and_Fifth_Wheel__c 
         ? 
         '/resource/Checkbox_With_Tick' : 
         '/resource/Checkbox_Without_Tick'; 
    } 
    get fillFluidsImage() {
         return this.fields.Check_and_Fill_All_Fluids__c 
         ? '/resource/Checkbox_With_Tick' : 
         '/resource/Checkbox_Without_Tick'; 
    } 
    get adjustBrakesImage() {
         return this.fields.Adjust_Brakes_As_Needed__c 
         ? '/resource/Checkbox_With_Tick' 
         : '/resource/Checkbox_Without_Tick'; 
    } 
    get coolantImage() { 
        return this.fields.Check_Regular_Coolant__c 
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick';
    }
    get extentLifeCoolandimg(){
        return this.fields.Extended_Life_Coolant_Check_FPL__c 
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick';
    }
    get EnsureAllTiresFilled100PSImage(){
        return this.fields.Ensure_All_Tires_Are_Filled_To_100_PSI__c 
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick';
    }
    get CompletedDOT_InspectionImg(){
        return this.fields.Completed_DOT_Inspection__c
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick';
    }
    get CompletedStateInspectionImg(){
        return this.fields.Completed_State_Inspection__c
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick';
    }
    get DigitalSignatureImg() {
        return this.fields.Digital_Signature__c
            ? '/resource/Checkbox_With_Tick' 
            : '/resource/Checkbox_Without_Tick';
    }
    get MaintanenceDigitalSignatureImg() {
        return this.fields.Signature_of_Inspector__c
            ? '/resource/Checkbox_With_Tick' 
            : '/resource/Checkbox_Without_Tick';
    }
   
   getCheckboxImage(componentValue, statusToCheck) {
    return componentValue === statusToCheck ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick';
    }

// Use helper method for all getters
    get gladHandsPassImg() { return this.getCheckboxImage(this.fields.Glad_Hands__c, 'Pass'); }
    get gladHandsFailImg() { return this.getCheckboxImage(this.fields.Glad_Hands__c, 'Fail'); }
    get gladHandsNaImg() { return this.getCheckboxImage(this.fields.Glad_Hands__c, 'Not Applicable'); }

    get serviceBrakesPassImg() { return this.getCheckboxImage(this.fields.Service_Brakes__c, 'Pass'); }
    get serviceBrakesFailImg() { return this.getCheckboxImage(this.fields.Service_Brakes__c, 'Fail'); }
    get serviceBrakesNaImg() { return this.getCheckboxImage(this.fields.Service_Brakes__c, 'Not Applicable'); }

    get brakeDrumsRotorsPassImg() { return this.getCheckboxImage(this.fields.Brake_Drums_or_Rotors__c, 'Pass'); }
    get brakeDrumsRotorsFailImg() { return this.getCheckboxImage(this.fields.Brake_Drums_or_Rotors__c, 'Fail'); }
    get brakeDrumsRotorsNaImg() { return this.getCheckboxImage(this.fields.Brake_Drums_or_Rotors__c, 'Not Applicable'); }
    
    get parkingBrakePassImg() { return this.getCheckboxImage(this.fields.Parking_Brake__c, 'Pass'); }
    get parkingBrakeFailImg() { return this.getCheckboxImage(this.fields.Parking_Brake__c, 'Fail'); }
    get parkingBrakeNaImg() { return this.getCheckboxImage(this.fields.Parking_Brake__c, 'Not Applicable'); }

    get hosesSpacingChaffingPassImg() { return this.getCheckboxImage(this.fields.Hoses_Spacing_Chaffing__c, 'Pass'); }
    get hosesSpacingChaffingFailImg() { return this.getCheckboxImage(this.fields.Hoses_Spacing_Chaffing__c, 'Fail'); }
    get hosesSpacingChaffingNaImg() { return this.getCheckboxImage(this.fields.Hoses_Spacing_Chaffing__c, 'Not Applicable'); }

    get brakeTubingPassImg() { return this.getCheckboxImage(this.fields.Brake_Tubing__c, 'Pass'); }
    get brakeTubingFailImg() { return this.getCheckboxImage(this.fields.Brake_Tubing__c, 'Fail'); }
    get brakeTubingNaImg() { return this.getCheckboxImage(this.fields.Brake_Tubing__c, 'Not Applicable'); }

    get tractorProtectionValvePassImg() { return this.getCheckboxImage(this.fields.Tractor_Protection_Valve__c, 'Pass'); }
    get tractorProtectionValveFailImg() { return this.getCheckboxImage(this.fields.Tractor_Protection_Valve__c, 'Fail'); }
    get tractorProtectionValveNaImg() { return this.getCheckboxImage(this.fields.Tractor_Protection_Valve__c, 'Not Applicable'); }

    get airCompressorPassImg() { return this.getCheckboxImage(this.fields.Air_Compressor__c, 'Pass'); }
    get airCompressorFailImg() { return this.getCheckboxImage(this.fields.Air_Compressor__c, 'Fail'); }
    get airCompressorNaImg() { return this.getCheckboxImage(this.fields.Air_Compressor__c, 'Not Applicable'); }

    get electricBrakesPassImg() { return this.getCheckboxImage(this.fields.Electric_Brakes__c, 'Pass'); }
    get electricBrakesFailImg() { return this.getCheckboxImage(this.fields.Electric_Brakes__c, 'Fail'); }
    get electricBrakesNaImg() { return this.getCheckboxImage(this.fields.Electric_Brakes__c, 'Not Applicable'); }

    get hydraulicBrakesPassImg() { return this.getCheckboxImage(this.fields.Hydraulic_Brakes__c, 'Pass'); }
    get hydraulicBrakesFailImg() { return this.getCheckboxImage(this.fields.Hydraulic_Brakes__c, 'Fail'); }
    get hydraulicBrakesNaImg() { return this.getCheckboxImage(this.fields.Hydraulic_Brakes__c, 'Not Applicable'); }

    get vacuumSystemsPassImg() { return this.getCheckboxImage(this.fields.Vacuum_Systems__c, 'Pass'); }
    get vacuumSystemsFailImg() { return this.getCheckboxImage(this.fields.Vacuum_Systems__c, 'Fail'); }
    get vacuumSystemsNaImg() { return this.getCheckboxImage(this.fields.Vacuum_Systems__c, 'Not Applicable'); }

    
    /*-----------------------------------------breaks ends--------------------------*/

    get pintleHooksPassImg() { return this.getCheckboxImage(this.fields.Pintle_Hooks__c, 'Pass'); }
    get pintleHooksFailImg() { return this.getCheckboxImage(this.fields.Pintle_Hooks__c, 'Fail'); }
    get pintleHooksNaImg() { return this.getCheckboxImage(this.fields.Pintle_Hooks__c, 'Not Applicable'); }

    get saddleMountsPassImg() { return this.getCheckboxImage(this.fields.Saddle_Mounts__c, 'Pass'); }
    get saddleMountsFailImg() { return this.getCheckboxImage(this.fields.Saddle_Mounts__c, 'Fail'); }
    get saddleMountsNaImg() { return this.getCheckboxImage(this.fields.Saddle_Mounts__c, 'Not Applicable'); }

    get slidingMechanismPassImg() { return this.getCheckboxImage(this.fields.Sliding_Mechanism__c, 'Pass'); }
    get slidingMechanismFailImg() { return this.getCheckboxImage(this.fields.Sliding_Mechanism__c, 'Fail'); }
    get slidingMechanismNaImg() { return this.getCheckboxImage(this.fields.Sliding_Mechanism__c, 'Not Applicable'); }

    get fifthWheelLocksPassImg() { return this.getCheckboxImage(this.fields.Fifth_Wheel_Locks_Adjustment__c, 'Pass'); }
    get fifthWheelLocksFailImg() { return this.getCheckboxImage(this.fields.Fifth_Wheel_Locks_Adjustment__c, 'Fail'); }
    get fifthWheelLocksNaImg() { return this.getCheckboxImage(this.fields.Fifth_Wheel_Locks_Adjustment__c, 'Not Applicable'); }

   
   /*----------------------------------------coupling tools ends--------------------------*/

    get notLeakingPassImg() { return this.getCheckboxImage(this.fields.Not_Leaking__c, 'Pass'); }
    get notLeakingFailImg() { return this.getCheckboxImage(this.fields.Not_Leaking__c, 'Fail'); }
    get notLeakingNaImg() { return this.getCheckboxImage(this.fields.Not_Leaking__c, 'Not Applicable'); }

    get wontBurnPassImg() { return this.getCheckboxImage(this.fields.Won_t_burn__c, 'Pass'); }
    get wontBurnFailImg() { return this.getCheckboxImage(this.fields.Won_t_burn__c, 'Fail'); }
    get wontBurnNaImg() { return this.getCheckboxImage(this.fields.Won_t_burn__c, 'Not Applicable'); }


 /*----------------------------------------EXHAUST SYSTEM ends--------------------------*/

    get wipersPassImg() { return this.getCheckboxImage(this.fields.Wipers__c, 'Pass'); }
    get wipersFailImg() { return this.getCheckboxImage(this.fields.Wipers__c, 'Fail'); }
    get wipersNaImg() { return this.getCheckboxImage(this.fields.Wipers__c, 'Not Applicable'); }

    get windShieldPassImg() { return this.getCheckboxImage(this.fields.WindShield__c, 'Pass'); }
    get windShieldFailImg() { return this.getCheckboxImage(this.fields.WindShield__c, 'Fail'); }
    get windShieldNaImg() { return this.getCheckboxImage(this.fields.WindShield__c, 'Not Applicable'); }


 /*----------------------------------------Winshild,wiper ends--------------------------*/

    get noVisibleLeaksPassImg() { return this.getCheckboxImage(this.fields.No_Visible_Leaks__c, 'Pass'); }
    get noVisibleLeaksFailImg() { return this.getCheckboxImage(this.fields.No_Visible_Leaks__c, 'Fail'); }
    get noVisibleLeaksNaImg() { return this.getCheckboxImage(this.fields.No_Visible_Leaks__c, 'Not Applicable'); }

    get fillerCapNotMissingPassImg() { return this.getCheckboxImage(this.fields.Filler_Cap_Not_Missing__c, 'Pass'); }
    get fillerCapNotMissingFailImg() { return this.getCheckboxImage(this.fields.Filler_Cap_Not_Missing__c, 'Fail'); }
    get fillerCapNotMissingNaImg() { return this.getCheckboxImage(this.fields.Filler_Cap_Not_Missing__c, 'Not Applicable'); }

    get tankSecurelyAttachedPassImg() { return this.getCheckboxImage(this.fields.Tank_Securely_Attached__c, 'Pass'); }
    get tankSecurelyAttachedFailImg() { return this.getCheckboxImage(this.fields.Tank_Securely_Attached__c, 'Fail'); }
    get tankSecurelyAttachedNaImg() { return this.getCheckboxImage(this.fields.Tank_Securely_Attached__c, 'Not Applicable'); }


/*----------------------------------------fuel system ends--------------------------*/
    get allDevicesPassImg() { return this.getCheckboxImage(this.fields.All_Devices__c, 'Pass'); }
    get allDevicesFailImg() { return this.getCheckboxImage(this.fields.All_Devices__c, 'Fail'); }
    get allDevicesNaImg() { return this.getCheckboxImage(this.fields.All_Devices__c, 'Not Applicable'); }

    get conspicuityTapePassImg() { return this.getCheckboxImage(this.fields.Conspicuity_Tape__c, 'Pass'); }
    get conspicuityTapeFailImg() { return this.getCheckboxImage(this.fields.Conspicuity_Tape__c, 'Fail'); }
    get conspicuityTapeNaImg() { return this.getCheckboxImage(this.fields.Conspicuity_Tape__c, 'Not Applicable'); }


/*----------------------------------------lightnig/refle ends--------------------------*/

    get protectionAgainstShiftingCargoPassImg() { return this.getCheckboxImage(this.fields.Protection_Against_Shifting_Cargo__c, 'Pass'); }
    get protectionAgainstShiftingCargoFailImg() { return this.getCheckboxImage(this.fields.Protection_Against_Shifting_Cargo__c, 'Fail'); }
    get protectionAgainstShiftingCargoNaImg() { return this.getCheckboxImage(this.fields.Protection_Against_Shifting_Cargo__c, 'Not Applicable'); }

    get conditionOfLoadingPassImg() { return this.getCheckboxImage(this.fields.Condition_Of_Loading__c, 'Pass'); }
    get conditionOfLoadingFailImg() { return this.getCheckboxImage(this.fields.Condition_Of_Loading__c, 'Fail'); }
    get conditionOfLoadingNaImg() { return this.getCheckboxImage(this.fields.Condition_Of_Loading__c, 'Not Applicable'); }


/*----------------------------------------safe loading ends--------------------------*/

    get steeringWheelFreePlayPassImg() { return this.getCheckboxImage(this.fields.Steering_Wheel_Free_Play__c, 'Pass'); }
    get steeringWheelFreePlayFailImg() { return this.getCheckboxImage(this.fields.Steering_Wheel_Free_Play__c, 'Fail'); }
    get steeringWheelFreePlayNaImg() { return this.getCheckboxImage(this.fields.Steering_Wheel_Free_Play__c, 'Not Applicable'); }

    get steeringColumnPassImg() { return this.getCheckboxImage(this.fields.Steering_Column__c, 'Pass'); }
    get steeringColumnFailImg() { return this.getCheckboxImage(this.fields.Steering_Column__c, 'Fail'); }
    get steeringColumnNaImg() { return this.getCheckboxImage(this.fields.Steering_Column__c, 'Not Applicable'); }

    get frontAxleBeamComponentsPassImg() { return this.getCheckboxImage(this.fields.Front_Axie_Beam_Components__c, 'Pass'); }
    get frontAxleBeamComponentsFailImg() { return this.getCheckboxImage(this.fields.Front_Axie_Beam_Components__c, 'Fail'); }
    get frontAxleBeamComponentsNaImg() { return this.getCheckboxImage(this.fields.Front_Axie_Beam_Components__c, 'Not Applicable'); }

    get steeringGearBoxPassImg() { return this.getCheckboxImage(this.fields.Steering_Gear_Box__c, 'Pass'); }
    get steeringGearBoxFailImg() { return this.getCheckboxImage(this.fields.Steering_Gear_Box__c, 'Fail'); }
    get steeringGearBoxNaImg() { return this.getCheckboxImage(this.fields.Steering_Gear_Box__c, 'Not Applicable'); }

    get pitmanArmPassImg() { return this.getCheckboxImage(this.fields.Pitman_Arm__c, 'Pass'); }
    get pitmanArmFailImg() { return this.getCheckboxImage(this.fields.Pitman_Arm__c, 'Fail'); }
    get pitmanArmNaImg() { return this.getCheckboxImage(this.fields.Pitman_Arm__c, 'Not Applicable'); }

    get powerSteeringPassImg() { return this.getCheckboxImage(this.fields.Power_Steering__c, 'Pass'); }
    get powerSteeringFailImg() { return this.getCheckboxImage(this.fields.Power_Steering__c, 'Fail'); }
    get powerSteeringNaImg() { return this.getCheckboxImage(this.fields.Power_Steering__c, 'Not Applicable'); }

    get ballAndSocketJointsPassImg() { return this.getCheckboxImage(this.fields.Ball_and_Socket_Joints__c, 'Pass'); }
    get ballAndSocketJointsFailImg() { return this.getCheckboxImage(this.fields.Ball_and_Socket_Joints__c, 'Fail'); }
    get ballAndSocketJointsNaImg() { return this.getCheckboxImage(this.fields.Ball_and_Socket_Joints__c, 'Not Applicable'); }

    get tieRodsAndDragLinksPassImg() { return this.getCheckboxImage(this.fields.Tie_Rods_and_Drag_Links__c, 'Pass'); }
    get tieRodsAndDragLinksFailImg() { return this.getCheckboxImage(this.fields.Tie_Rods_and_Drag_Links__c, 'Fail'); }
    get tieRodsAndDragLinksNaImg() { return this.getCheckboxImage(this.fields.Tie_Rods_and_Drag_Links__c, 'Not Applicable'); }

    get nutsPassImg() { return this.getCheckboxImage(this.fields.Nuts__c, 'Pass'); }
    get nutsFailImg() { return this.getCheckboxImage(this.fields.Nuts__c, 'Fail'); }
    get nutsNaImg() { return this.getCheckboxImage(this.fields.Nuts__c, 'Not Applicable'); }

    get steeringSystemPassImg() { return this.getCheckboxImage(this.fields.Steering_System__c, 'Pass'); }
    get steeringSystemFailImg() { return this.getCheckboxImage(this.fields.Steering_System__c, 'Fail'); }
    get steeringSystemNaImg() { return this.getCheckboxImage(this.fields.Steering_System__c, 'Not Applicable'); }


/*----------------------------------------steering mechnisun ends--------------------------*/

    get frameMembersPassImg() { return this.getCheckboxImage(this.fields.Frame_Members__c, 'Pass'); }
    get frameMembersFailImg() { return this.getCheckboxImage(this.fields.Frame_Members__c, 'Fail'); }
    get frameMembersNaImg() { return this.getCheckboxImage(this.fields.Frame_Members__c, 'Not Applicable'); }

    get tireAndWheelClearancePassImg() { return this.getCheckboxImage(this.fields.Tire_and_Wheel_Clearance__c, 'Pass'); }
    get tireAndWheelClearanceFailImg() { return this.getCheckboxImage(this.fields.Tire_and_Wheel_Clearance__c, 'Fail'); }
    get tireAndWheelClearanceNaImg() { return this.getCheckboxImage(this.fields.Tire_and_Wheel_Clearance__c, 'Not Applicable'); }

    get adjustableAxleAssembliesPassImg() { return this.getCheckboxImage(this.fields.Adjustable_Axle_Assemblies__c, 'Pass'); }
    get adjustableAxleAssembliesFailImg() { return this.getCheckboxImage(this.fields.Adjustable_Axle_Assemblies__c, 'Fail'); }
    get adjustableAxleAssembliesNaImg() { return this.getCheckboxImage(this.fields.Adjustable_Axle_Assemblies__c, 'Not Applicable'); }


/*----------------------------------------frame ends--------------------------*/

    get damageCheckPassImg() { return this.getCheckboxImage(this.fields.Damage__c, 'Pass'); }
    get damageCheckFailImg() { return this.getCheckboxImage(this.fields.Damage__c, 'Fail'); }
    get damageCheckNaImg() { return this.getCheckboxImage(this.fields.Damage__c, 'Not Applicable'); }

    get electricalInspectionPassImg() { return this.getCheckboxImage(this.fields.Electrical__c, 'Pass'); }
    get electricalInspectionFailImg() { return this.getCheckboxImage(this.fields.Electrical__c, 'Fail'); }
    get electricalInspectionNaImg() { return this.getCheckboxImage(this.fields.Electrical__c, 'Not Applicable'); }

    get boxSkinConditionPassImg() { return this.getCheckboxImage(this.fields.Box_Skin__c, 'Pass'); }
    get boxSkinConditionFailImg() { return this.getCheckboxImage(this.fields.Box_Skin__c, 'Fail'); }
    get boxSkinConditionNaImg() { return this.getCheckboxImage(this.fields.Box_Skin__c, 'Not Applicable'); }

    get uBoltsTorque50lbFtPassImg() { return this.getCheckboxImage(this.fields.U_Bolts_Torque_50_llb_ft__c, 'Pass'); }
    get uBoltsTorque50lbFtFailImg() { return this.getCheckboxImage(this.fields.U_Bolts_Torque_50_llb_ft__c, 'Fail'); }
    get uBoltsTorque50lbFtNaImg() { return this.getCheckboxImage(this.fields.U_Bolts_Torque_50_llb_ft__c, 'Not Applicable'); }

    get inspectWeldsForCrackingPassImg() { return this.getCheckboxImage(this.fields.Inspect_Welds_For_Cracking__c, 'Pass'); }
    get inspectWeldsForCrackingFailImg() { return this.getCheckboxImage(this.fields.Inspect_Welds_For_Cracking__c, 'Fail'); }
    get inspectWeldsForCrackingNaImg() { return this.getCheckboxImage(this.fields.Inspect_Welds_For_Cracking__c, 'Not Applicable'); }

    get doorRollerInspectionAndLubricationPassImg() { return this.getCheckboxImage(this.fields.Door_Roller_Inspect_and_Lube__c, 'Pass'); }
    get doorRollerInspectionAndLubricationFailImg() { return this.getCheckboxImage(this.fields.Door_Roller_Inspect_and_Lube__c, 'Fail'); }
    get doorRollerInspectionAndLubricationNaImg() { return this.getCheckboxImage(this.fields.Door_Roller_Inspect_and_Lube__c, 'Not Applicable'); }

    get hingeInspectionAndLubricationPassImg() { return this.getCheckboxImage(this.fields.Hinge_Inspect_and_Lube__c, 'Pass'); }
    get hingeInspectionAndLubricationFailImg() { return this.getCheckboxImage(this.fields.Hinge_Inspect_and_Lube__c, 'Fail'); }
    get hingeInspectionAndLubricationNaImg() { return this.getCheckboxImage(this.fields.Hinge_Inspect_and_Lube__c, 'Not Applicable'); }

    get doorOperationSealsCheckPassImg() { return this.getCheckboxImage(this.fields.Door_Operation_Seals__c, 'Pass'); }
    get doorOperationSealsCheckFailImg() { return this.getCheckboxImage(this.fields.Door_Operation_Seals__c, 'Fail'); }
    get doorOperationSealsCheckNaImg() { return this.getCheckboxImage(this.fields.Door_Operation_Seals__c, 'Not Applicable'); }

    
/*----------------------------------------Body ends--------------------------*/

    get springsAirBagsHeightPassImg() { return this.getCheckboxImage(this.fields.Springs_Air_Bags_Height__c, 'Pass'); }
    get springsAirBagsHeightFailImg() { return this.getCheckboxImage(this.fields.Springs_Air_Bags_Height__c, 'Fail'); }
    get springsAirBagsHeightNaImg() { return this.getCheckboxImage(this.fields.Springs_Air_Bags_Height__c, 'Not Applicable'); }

    get springHangersPassImg() { return this.getCheckboxImage(this.fields.Spring_Hangers__c, 'Pass'); }
    get springHangersFailImg() { return this.getCheckboxImage(this.fields.Spring_Hangers__c, 'Fail'); }
    get springHangersNaImg() { return this.getCheckboxImage(this.fields.Spring_Hangers__c, 'Not Applicable'); }

    get frontUBoltTorque270_360lbFtPassImg() { return this.getCheckboxImage(this.fields.Front_U_Bolt_Torque_270_360_lb_ft__c, 'Pass'); }
    get frontUBoltTorque270_360lbFtFailImg() { return this.getCheckboxImage(this.fields.Front_U_Bolt_Torque_270_360_lb_ft__c, 'Fail'); }
    get frontUBoltTorque270_360lbFtNaImg() { return this.getCheckboxImage(this.fields.Front_U_Bolt_Torque_270_360_lb_ft__c, 'Not Applicable'); }

    get rearUBoltTorque420_500lbFtPassImg() { return this.getCheckboxImage(this.fields.Rear_U_Bolt_Torque_420_500_lb_ft__c, 'Pass'); }
    get rearUBoltTorque420_500lbFtFailImg() { return this.getCheckboxImage(this.fields.Rear_U_Bolt_Torque_420_500_lb_ft__c, 'Fail'); }
    get rearUBoltTorque420_500lbFtNaImg() { return this.getCheckboxImage(this.fields.Rear_U_Bolt_Torque_420_500_lb_ft__c, 'Not Applicable'); }

    get torqueRadiusOrTrackingComponentsPassImg() { return this.getCheckboxImage(this.fields.Torque_Radius_or_Tracking_Components__c, 'Pass'); }
    get torqueRadiusOrTrackingComponentsFailImg() { return this.getCheckboxImage(this.fields.Torque_Radius_or_Tracking_Components__c, 'Fail'); }
    get torqueRadiusOrTrackingComponentsNaImg() { return this.getCheckboxImage(this.fields.Torque_Radius_or_Tracking_Components__c, 'Not Applicable'); }

    
    /*------------------------------rear suspension ends------------------------------------*/

        get InspectReplaceCabinAirFilterPassimg() { return this.getCheckboxImage(this.fields.Inspect_Replace_Cabin_Air_Filter__c, 'Pass');  } 
    get InspectReplaceCabinAirFilterFailImg() { return this.getCheckboxImage(this.fields.Inspect_Replace_Cabin_Air_Filter__c, 'Fail'); }
    get InspectReplaceCabinAirFilterNaImg() { return this.getCheckboxImage(this.fields.Inspect_Replace_Cabin_Air_Filter__c, 'Not Applicable'); }


   /*------------------------------HVAC ends------------------------------------*/ 

    get lockOrSideRingPassImg() { return this.getCheckboxImage(this.fields.Lock_or_Side_Ring__c, 'Pass'); }
    get lockOrSideRingFailImg() { return this.getCheckboxImage(this.fields.Lock_or_Side_Ring__c, 'Fail'); }
    get lockOrSideRingNaImg() { return this.getCheckboxImage(this.fields.Lock_or_Side_Ring__c, 'Not Applicable'); }

    get weldsPassImg() { return this.getCheckboxImage(this.fields.Welds__c, 'Pass'); }
    get weldsFailImg() { return this.getCheckboxImage(this.fields.Welds__c, 'Fail'); }
    get weldsNaImg() { return this.getCheckboxImage(this.fields.Welds__c, 'Not Applicable'); }

    get wheelsAndRimsPassImg() { return this.getCheckboxImage(this.fields.Wheels_and_Rims__c, 'Pass'); }
    get wheelsAndRimsFailImg() { return this.getCheckboxImage(this.fields.Wheels_and_Rims__c, 'Fail'); }
    get wheelsAndRimsNaImg() { return this.getCheckboxImage(this.fields.Wheels_and_Rims__c, 'Not Applicable'); }

    get studsAndLugNutsPassImg() { return this.getCheckboxImage(this.fields.Studs_and_Lug_Nuts__c, 'Pass'); }
    get studsAndLugNutsFailImg() { return this.getCheckboxImage(this.fields.Studs_and_Lug_Nuts__c, 'Fail'); }
    get studsAndLugNutsNaImg() { return this.getCheckboxImage(this.fields.Studs_and_Lug_Nuts__c, 'Not Applicable'); }

    get wheelBearingsPassImg() { return this.getCheckboxImage(this.fields.Wheel_Bearings__c, 'Pass'); }
    get wheelBearingsFailImg() { return this.getCheckboxImage(this.fields.Wheel_Bearings__c, 'Fail'); }
    get wheelBearingsNaImg() { return this.getCheckboxImage(this.fields.Wheel_Bearings__c, 'Not Applicable'); }

    get axleSealsPassImg() { return this.getCheckboxImage(this.fields.Axle_Seals__c, 'Pass'); }
    get axleSealsFailImg() { return this.getCheckboxImage(this.fields.Axle_Seals__c, 'Fail'); }
    get axleSealsNaImg() { return this.getCheckboxImage(this.fields.Axle_Seals__c, 'Not Applicable'); }

    get mudflapsPassImg() { return this.getCheckboxImage(this.fields.Mudflaps__c, 'Pass'); }
    get mudflapsFailImg() { return this.getCheckboxImage(this.fields.Mudflaps__c, 'Fail'); }
    get mudflapsNaImg() { return this.getCheckboxImage(this.fields.Mudflaps__c, 'Not Applicable'); }

    
    /*------------------------------Wheels and rims ends------------------------------------*/ 

    get trianglesPassImg() { return this.getCheckboxImage(this.fields.Triangles__c, 'Pass'); }
    get trianglesFailImg() { return this.getCheckboxImage(this.fields.Triangles__c, 'Fail'); }
    get trianglesNaImg() { return this.getCheckboxImage(this.fields.Triangles__c, 'Not Applicable'); }

    get extinguisherPassImg() { return this.getCheckboxImage(this.fields.Extinguisher__c, 'Pass'); }
    get extinguisherFailImg() { return this.getCheckboxImage(this.fields.Extinguisher__c, 'Fail'); }
    get extinguisherNaImg() { return this.getCheckboxImage(this.fields.Extinguisher__c, 'Not Applicable'); }

    get placardsHoldersPassImg() { return this.getCheckboxImage(this.fields.Placards_Holders__c, 'Pass'); }
    get placardsHoldersFailImg() { return this.getCheckboxImage(this.fields.Placards_Holders__c, 'Fail'); }
    get placardsHoldersNaImg() { return this.getCheckboxImage(this.fields.Placards_Holders__c, 'Not Applicable'); }

    get hornPassImg() { return this.getCheckboxImage(this.fields.Horn__c, 'Pass'); }
    get hornFailImg() { return this.getCheckboxImage(this.fields.Horn__c, 'Fail'); }
    get hornNaImg() { return this.getCheckboxImage(this.fields.Horn__c, 'Not Applicable'); }

    
    /*------------------------------safty ends------------------------------------*/ 

    get steeringAxlePassImg() { return this.getCheckboxImage(this.fields.Steering_Axle__c, 'Pass'); }
    get steeringAxleFailImg() { return this.getCheckboxImage(this.fields.Steering_Axle__c, 'Fail'); }
    get steeringAxleNaImg() { return this.getCheckboxImage(this.fields.Steering_Axle__c, 'Not Applicable'); }

    get allOtherTiresPassImg() { return this.getCheckboxImage(this.fields.All_Other_Tires__c, 'Pass'); }
    get allOtherTiresFailImg() { return this.getCheckboxImage(this.fields.All_Other_Tires__c, 'Fail'); }
    get allOtherTiresNaImg() { return this.getCheckboxImage(this.fields.All_Other_Tires__c, 'Not Applicable'); }
 
    
/*------------------------------tires ends------------------------------------*/ 

    get completedPassImg() { return this.getCheckboxImage(this.fields.Completed__c, 'Pass'); }
    get completedFailImg() { return this.getCheckboxImage(this.fields.Completed__c, 'Fail'); }
    get completedNaImg() { return this.getCheckboxImage(this.fields.Completed__c, 'Not Applicable'); }

   /*------------------------------completed ends------------------------------------*/  

    get Does_theDOT_InspectionDecalExpirePassImg() { return this.fields.Does_the_DOT_Inspection_Decal_Expire__c === "Yes (Complete both 'B' and 'C')" ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get Does_theDOT_InspectionDecalExpireFailImg() { return this.fields.Does_the_DOT_Inspection_Decal_Expire__c === "No (Skip directly to 'C')" ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 

    get DoestheStateInspectionDecalExpirePassImg() { return this.fields.Does_the_State_Inspection_Decal_Expire__c === "Yes (Complete Both 'E' and 'F')" ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get DoestheStateInspectionDecalFailExpire() { return this.fields.Does_the_State_Inspection_Decal_Expire__c === "No (Skip directly to 'F')" ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get DoestheStateInspectionDecalNAExpire() { return this.fields.Does_the_State_Inspection_Decal_Expire__c === 'N/A' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    
    get airCleanersImage() {
        return '/resource/Checkbox_Without_Tick';
    }

/*-----------------------------------------------------------------------Create Button----------------------------------------------------------------------------------------------------------------------------------------*/

    isEditPage = false;
    @track isSignatureAdded = false;
    @track showSignaturePad = false;
    @track isSignatureAddedMaintanence = false;
    @track showSignaturePadMaintanence = false;
     signaturePad;
    drawing = false;

    toggleSignaturePad(event) {
        this.isSignatureAdded = event.target.checked;
        this.showSignaturePad = event.target.checked;
        if (this.showSignaturePad) {
            setTimeout(() => {
                const canvas = this.template.querySelector('canvas');
                this.signaturePad = canvas.getContext('2d');
                this.signaturePad.fillStyle = "white";
                this.signaturePad.fillRect(0, 0, canvas.width, canvas.height);
                this.signaturePad.strokeStyle = "#0000ff";
                this.signaturePad.lineWidth = 2;
            }, 0);
        }
    }

     toggleSignaturePadMaintanence(event) {
        this.isSignatureAddedMaintanence = event.target.checked;
        this.showSignaturePadMaintanence = event.target.checked;
        if (this.showSignaturePadMaintanence) {
            setTimeout(() => {
                const canvas = this.template.querySelector('canvas');
                this.signaturePad = canvas.getContext('2d');
                this.signaturePad.fillStyle = "white";
                this.signaturePad.fillRect(0, 0, canvas.width, canvas.height);
                this.signaturePad.strokeStyle = "#0000ff";
                this.signaturePad.lineWidth = 2;
            }, 0);
        }
    }

    // Close Signature Modal
    closeSignaturePad() {
        this.showSignaturePad = false;
        this.isSignatureAdded = false;
    }

    closeSignaturePadMaintanence() {
        this.showSignaturePadMaintanence = false;
        this.isSignatureAddedMaintanence = false;
    }


    // Start Drawing
    startDrawing(event) {
        event.preventDefault();
        this.drawing = true;
        this.signaturePad.beginPath();
        this.signaturePad.moveTo(this.getMousePos(event).x, this.getMousePos(event).y);
    }

    // Draw on Canvas
    draw(event) {
        if (!this.drawing) return;
        const pos = this.getMousePos(event);
        this.signaturePad.lineTo(pos.x, pos.y);
        this.signaturePad.stroke();
    }

    // Stop Drawing
    stopDrawing() {
        this.drawing = false;
        this.signaturePad.closePath();
    }

    // Get Mouse Position
    getMousePos(event) {
        const rect = this.template.querySelector('canvas').getBoundingClientRect();
        const x = event.clientX ? event.clientX - rect.left : event.touches[0].clientX - rect.left;
        const y = event.clientY ? event.clientY - rect.top : event.touches[0].clientY - rect.top;
        return { x, y };
    }

    // Clear Signature
    clearSignature() {
        const canvas = this.template.querySelector('canvas');
        this.signaturePad.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Save Signature
    saveSignature() {
        const canvas = this.template.querySelector('canvas');
        const signatureData = canvas.toDataURL('image/png');
        this.fields['Digital_Signature__c'] = `<img src="${signatureData}" />`;
        this.showSignaturePad = false;
    }

    saveSignatureMaintanence() {
       const canvas = this.template.querySelector('canvas');
        const signatureData = canvas.toDataURL('image/png');
        this.fields['Signature_of_Inspector__c'] = `<img src="${signatureData}" />`;
        this.showSignaturePadMaintanence = false;
    }



    handleNavigateToEdit() {
        this.isEditPage = true;
    }
    handleNavigateBack() {
        this.isEditPage = false;
    }
    handleInputChange(event) {
        const field = event.target.dataset.field; 
        const isCheckbox = event.target.type === 'checkbox'; 
        this.fields[field] = isCheckbox ? event.target.checked : event.target.value;
        console.log("Updated Fields:", this.fields);
    }
    handlePicklistChange(event) {
    const field = event.target.dataset.field; // Get the field name from the data attribute
    const selectedValue = event.target.dataset.value; // Get the selected value from the data attribute
    
    // Get the current selected value for the field
    const currentSelectedValue = this[field];
    
    // Toggle the selection if the same value is selected again
    const newValue = (currentSelectedValue === selectedValue) ? null : selectedValue;
    
    this.updatePicklistField(field, newValue); // Update the picklist field with the new value
    
    // Ensure only one checkbox is checked at a time for each field group
    const checkboxes = this.template.querySelectorAll(`[data-field="${field}"]`);
    checkboxes.forEach(checkbox => {
        checkbox.checked = (checkbox.dataset.value === newValue);
    });
}

updatePicklistField(fieldName, selectedValue) { // Update the state for the field
    this[fieldName] = selectedValue; // Update the field's value
    this.fields[fieldName] = selectedValue;
    console.log(`Updated ${fieldName} to ${selectedValue}`);
    console.log('Updated Fields:', this.fields);
}

    validateFields() {
        const validations = [
            {
                field: 'Mileage__c',
                condition: (value) => !value || /^[0-9]+$/.test(value),
                errorMessage: 'Mileage must contain only numeric values.'
            },
            {
                field: 'Unit__c',
                condition: (value) => !value || /^[0-9]+$/.test(value),
                errorMessage: 'Unit must contain only numeric values.'
            }
        ];

        for (const { field, condition, errorMessage } of validations) {
            if (field in this.fields) {
                const value = this.fields[field];
                if (!condition(value)) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Validation Error',
                            message: errorMessage,
                            variant: 'error',
                        })
                    );
                    return false;
                }
            }
        }

        return true;
    }



    handleSave() {

        if (!this.validateFields()) {
            return; // Stop the save operation if validation fails
        }
        
        const fields = { ...this.fields, Id: this.recordId };

        console.log("Record Input Fields:", fields);

        updateRecord({ fields })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record updated successfully',
                        variant: 'success',
                    })
                );
                 this[NavigationMixin.Navigate]({

                type: 'standard__recordPage',

                attributes: {

                    recordId: this.recordId,

                    objectApiName: 'Inspection_Sheet__c', // Replace with your object API name

                    actionName: 'view',

                },


            });
            })
            .catch(error => {
                console.error("Error updating record:", error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating record',
                        message: error.body ? error.body.message : error.message,
                        variant: 'error',
                    })
                );
            });
    }
    
    
    get gladHandsPasscheck() { return this.fields.Glad_Hands__c === 'Pass'; }get gladHandsFailcheck() { return this.fields.Glad_Hands__c === 'Fail'; }get gladHandsNacheck() { return this.fields.Glad_Hands__c === 'Not Applicable'; }
    get ServiceBrakesPasscheck() { return this.fields.Service_Brakes__c === 'Pass'; }get ServiceBrakesFailcheck() { return this.fields.Service_Brakes__c === 'Fail'; }get ServiceBrakesNacheck() { return this.fields.Service_Brakes__c === 'Not Applicable'; }
    get parkingBrakesPasscheck() { return this.fields.Parking_Brake__c === 'Pass'; }get parkingBreaksFailcheck() { return this.fields.Parking_Brake__c === 'Fail'; }get parkingBrakesNacheck() { return this.fields.Parking_Brake__c === 'Not Applicable'; }
    get parkingDrumsPasscheck() { return this.fields.Brake_Drums_or_Rotors__c === 'Pass'; }get parkingDrumsFailcheck() { return this.fields.Brake_Drums_or_Rotors__c === 'Fail'; }get parkingDrumsNacheck() { return this.fields.Brake_Drums_or_Rotors__c === 'Not Applicable'; }
    get hosesPasscheck() { return this.fields.Hoses_Spacing_Chaffing__c === 'Pass'; }get hosesFailcheck() { return this.fields.Hoses_Spacing_Chaffing__c === 'Fail'; }get hosesNacheck() { return this.fields.Hoses_Spacing_Chaffing__c === 'Not Applicable'; }
    get breakTubePasscheck() { return this.fields.Brake_Tubing__c === 'Pass'; }get breakTubeFailcheck() { return this.fields.Brake_Tubing__c === 'Fail'; }get breakTubeNacheck() { return this.fields.Brake_Tubing__c === 'Not Applicable'; }
    get tractorProtectionValvePasscheck() { return this.fields.Tractor_Protection_Valve__c === 'Pass'; }get tractorProtectionValveFailcheck() { return this.fields.Tractor_Protection_Valve__c === 'Fail'; }get tractorProtectionValveNacheck() { return this.fields.Tractor_Protection_Valve__c === 'Not Applicable'; }
    get airCompressorPasscheck() { return this.fields.Air_Compressor__c === 'Pass'; }get airCompressorFailcheck() { return this.fields.Air_Compressor__c === 'Fail'; }get airCompressorNacheck() { return this.fields.Air_Compressor__c === 'Not Applicable'; }
    get electricBrakesPasscheck() { return this.fields.Electric_Brakes__c === 'Pass'; }get electricBrakesFailcheck() { return this.fields.Electric_Brakes__c === 'Fail'; }get electricBrakesNacheck() { return this.fields.Electric_Brakes__c === 'Not Applicable'; }
    get hydraulicBrakesPasscheck() { return this.fields.Hydraulic_Brakes__c === 'Pass'; }get hydraulicBrakesFailcheck() { return this.fields.Hydraulic_Brakes__c === 'Fail'; }get hydraulicBrakesNacheck() { return this.fields.Hydraulic_Brakes__c === 'Not Applicable'; }
    get vacuumSystemsPasscheck() { return this.fields.Vacuum_Systems__c === 'Pass'; }get vacuumSystemsFailcheck() { return this.fields.Vacuum_Systems__c === 'Fail'; }get vacuumSystemsNacheck() { return this.fields.Vacuum_Systems__c === 'Not Applicable'; }
    get pintleHooksPasscheck() { return this.fields.Pintle_Hooks__c === 'Pass'; }get pintleHooksFailcheck() { return this.fields.Pintle_Hooks__c === 'Fail'; }get pintleHooksNacheck() { return this.fields.Pintle_Hooks__c === 'Not Applicable'; }
    get saddleMountsPasscheck() { return this.fields.Saddle_Mounts__c === 'Pass'; }get saddleMountsFailcheck() { return this.fields.Saddle_Mounts__c === 'Fail'; }get saddleMountsNacheck() { return this.fields.Saddle_Mounts__c === 'Not Applicable'; }
    get slidingMechanismPasscheck() { return this.fields.Sliding_Mechanism__c === 'Pass'; }get slidingMechanismFailcheck() { return this.fields.Sliding_Mechanism__c === 'Fail'; }get slidingMechanismNacheck() { return this.fields.Sliding_Mechanism__c === 'Not Applicable'; }
    get fifthWheelLocksPasscheck() { return this.fields.Fifth_Wheel_Locks_Adjustment__c === 'Pass'; }get fifthWheelLocksFailcheck() { return this.fields.Fifth_Wheel_Locks_Adjustment__c === 'Fail'; }get fifthWheelLocksNacheck() { return this.fields.Fifth_Wheel_Locks_Adjustment__c === 'Not Applicable'; }
    get NotLeakingPasscheck() { return this.fields.Not_Leaking__c=== 'Pass'; }get NotLeakingFailcheck() { return this.fields.Not_Leaking__c=== 'Fail'; }get NotLeakingNacheck() { return this.fields.Not_Leaking__c=== 'Not Applicable'; }
    get Won_tburnPasscheck() { return this.fields.Won_t_burn__c === 'Pass'; }get Won_tburnFailcheck() { return this.fields.Won_t_burn__c === 'Fail'; }get Won_tburnNacheck() { return this.fields.Won_t_burn__c === 'Not Applicable'; }
    get WipersPasscheck() { return this.fields.Wipers__c === 'Pass'; }get WipersFailcheck() { return this.fields.Wipers__c === 'Fail'; }get WipersNacheck() { return this.fields.Wipers__c === 'Not Applicable'; }
    get WindShieldPasscheck() { return this.fields.WindShield__c === 'Pass'; }get WindShieldFailcheck() { return this.fields.WindShield__c === 'Fail'; }get WindShieldNacheck() { return this.fields.WindShield__c === 'Not Applicable'; }
    get NoVisibleLeaksPasscheck() {return this.fields.No_Visible_Leaks__c === 'Pass';}get NoVisibleLeaksFailcheck() {return this.fields.No_Visible_Leaks__c === 'Fail';}get NoVisibleLeaksNacheck() {return this.fields.No_Visible_Leaks__c === 'Not Applicable';}
    get FillerCapNotMissingPasscheck() {return this.fields.Filler_Cap_Not_Missing__c === 'Pass';}get FillerCapNotMissingFailcheck() {return this.fields.Filler_Cap_Not_Missing__c === 'Fail';}get FillerCapNotMissingNacheck() {return this.fields.Filler_Cap_Not_Missing__c === 'Not Applicable';}
    get TankSecurelyAttachedPasscheck() {return this.fields.Tank_Securely_Attached__c === 'Pass';}get TankSecurelyAttachedFailcheck() {return this.fields.Tank_Securely_Attached__c === 'Fail';}get TankSecurelyAttachedNacheck() {return this.fields.Tank_Securely_Attached__c === 'Not Applicable';}
    get AllDevicesPasscheck() {
    return this.fields.All_Devices__c === 'Pass';
    }
    get AllDevicesFailcheck() {
        return this.fields.All_Devices__c === 'Fail';
    }
    get AllDevicesNacheck() {
        return this.fields.All_Devices__c === 'Not Applicable';
    }

    get ConspicuityTapePasscheck() {
        return this.fields.Conspicuity_Tape__c === 'Pass';
    }
    get ConspicuityTapeFailcheck() {
        return this.fields.Conspicuity_Tape__c === 'Fail';
    }
    get ConspicuityTapeNacheck() {
        return this.fields.Conspicuity_Tape__c === 'Not Applicable';
    }

    get ProtectionAgainstShiftingCargoPasscheck() {
    return this.fields.Protection_Against_Shifting_Cargo__c === 'Pass';
    }
    get ProtectionAgainstShiftingCargoFailcheck() {
        return this.fields.Protection_Against_Shifting_Cargo__c === 'Fail';
    }
    get ProtectionAgainstShiftingCargoNacheck() {
        return this.fields.Protection_Against_Shifting_Cargo__c === 'Not Applicable';
    }

    get ConditionOfLoadingPasscheck() {
        return this.fields.Condition_Of_Loading__c === 'Pass';
    }
    get ConditionOfLoadingFailcheck() {
        return this.fields.Condition_Of_Loading__c === 'Fail';
    }
    get ConditionOfLoadingNacheck() {
        return this.fields.Condition_Of_Loading__c === 'Not Applicable';
    }

    get SteeringWheelFreePlayPasscheck() {
    return this.fields.Steering_Wheel_Free_Play__c === 'Pass';
    }
    get SteeringWheelFreePlayFailcheck() {
        return this.fields.Steering_Wheel_Free_Play__c === 'Fail';
    }
    get SteeringWheelFreePlayNacheck() {
        return this.fields.Steering_Wheel_Free_Play__c === 'Not Applicable';
    }

    get SteeringColumnPasscheck() {
        return this.fields.Steering_Column__c === 'Pass';
    }
    get SteeringColumnFailcheck() {
        return this.fields.Steering_Column__c === 'Fail';
    }
    get SteeringColumnNacheck() {
        return this.fields.Steering_Column__c === 'Not Applicable';
    }

    get FrontAxleBeamComponentsPasscheck() {
        return this.fields.Front_Axie_Beam_Components__c === 'Pass';
    }
    get FrontAxleBeamComponentsFailcheck() {
        return this.fields.Front_Axie_Beam_Components__c === 'Fail';
    }
    get FrontAxleBeamComponentsNacheck() {
        return this.fields.Front_Axie_Beam_Components__c === 'Not Applicable';
    }

    get SteeringGearBoxPasscheck() {
        return this.fields.Steering_Gear_Box__c === 'Pass';
    }
    get SteeringGearBoxFailcheck() {
        return this.fields.Steering_Gear_Box__c === 'Fail';
    }
    get SteeringGearBoxNacheck() {
        return this.fields.Steering_Gear_Box__c === 'Not Applicable';
    }

    get PitmanArmPasscheck() {
        return this.fields.Pitman_Arm__c === 'Pass';
    }
    get PitmanArmFailcheck() {
        return this.fields.Pitman_Arm__c === 'Fail';
    }
    get PitmanArmNacheck() {
        return this.fields.Pitman_Arm__c === 'Not Applicable';
    }

    get PowerSteeringPasscheck() {
        return this.fields.Power_Steering__c === 'Pass';
    }
    get PowerSteeringFailcheck() {
        return this.fields.Power_Steering__c === 'Fail';
    }
    get PowerSteeringNacheck() {
        return this.fields.Power_Steering__c === 'Not Applicable';
    }

    get BallAndSocketJointsPasscheck() {
        return this.fields.Ball_and_Socket_Joints__c === 'Pass';
    }
    get BallAndSocketJointsFailcheck() {
        return this.fields.Ball_and_Socket_Joints__c === 'Fail';
    }
    get BallAndSocketJointsNacheck() {
        return this.fields.Ball_and_Socket_Joints__c === 'Not Applicable';
    }

    get TieRodsAndDragLinksPasscheck() {
    return this.fields.Tie_Rods_and_Drag_Links__c === 'Pass';
    }
    get TieRodsAndDragLinksFailcheck() {
        return this.fields.Tie_Rods_and_Drag_Links__c === 'Fail';
    }
    get TieRodsAndDragLinksNacheck() {
        return this.fields.Tie_Rods_and_Drag_Links__c === 'Not Applicable';
    }

    get SteeringSystemPasscheck() {
    return this.fields.Steering_System__c === 'Pass';
    }
    get SteeringSystemFailcheck() {
        return this.fields.Steering_System__c === 'Fail';
    }
    get SteeringSystemNacheck() {
        return this.fields.Steering_System__c === 'Not Applicable';
    }

    get NutsPasscheck() {
        return this.fields.Nuts__c === 'Pass';
    }
    get NutsFailcheck() {
        return this.fields.Nuts__c === 'Fail';
    }
    get NutsNacheck() {
        return this.fields.Nuts__c === 'Not Applicable';
    }

    get FrameMembersPasscheck() {
    return this.fields.Frame_Members__c === 'Pass';
    }
    get FrameMembersFailcheck() {
        return this.fields.Frame_Members__c === 'Fail';
    }
    get FrameMembersNacheck() {
        return this.fields.Frame_Members__c === 'Not Applicable';
    }

    get TireAndWheelClearancePasscheck() {
        return this.fields.Tire_and_Wheel_Clearance__c === 'Pass';
    }
    get TireAndWheelClearanceFailcheck() {
        return this.fields.Tire_and_Wheel_Clearance__c === 'Fail';
    }
    get TireAndWheelClearanceNacheck() {
        return this.fields.Tire_and_Wheel_Clearance__c === 'Not Applicable';
    }

    get AdjustableAxleAssembliesPasscheck() {
        return this.fields.Adjustable_Axle_Assemblies__c === 'Pass';
    }
    get AdjustableAxleAssembliesFailcheck() {
        return this.fields.Adjustable_Axle_Assemblies__c === 'Fail';
    }
    get AdjustableAxleAssembliesNacheck() {
        return this.fields.Adjustable_Axle_Assemblies__c === 'Not Applicable';
    }

    get DamagePasscheck() {
    return this.fields.Damage__c === 'Pass';
    }
    get DamageFailcheck() {
        return this.fields.Damage__c === 'Fail';
    }
    get DamageNacheck() {
        return this.fields.Damage__c === 'Not Applicable';
    }

    get ElectricalPasscheck() {
        return this.fields.Electrical__c === 'Pass';
    }
    get ElectricalFailcheck() {
        return this.fields.Electrical__c === 'Fail';
    }
    get ElectricalNacheck() {
        return this.fields.Electrical__c === 'Not Applicable';
    }

    get BoxSkinPasscheck() {
        return this.fields.Box_Skin__c === 'Pass';
    }
    get BoxSkinFailcheck() {
        return this.fields.Box_Skin__c === 'Fail';
    }
    get BoxSkinNacheck() {
        return this.fields.Box_Skin__c === 'Not Applicable';
    }

    get UBoltsTorquePasscheck() {
        return this.fields.U_Bolts_Torque_50_llb_ft__c === 'Pass';
    }
    get UBoltsTorqueFailcheck() {
        return this.fields.U_Bolts_Torque_50_llb_ft__c === 'Fail';
    }
    get UBoltsTorqueNacheck() {
        return this.fields.U_Bolts_Torque_50_llb_ft__c === 'Not Applicable';
    }

    get InspectWeldsPasscheck() {
        return this.fields.Inspect_Welds_For_Cracking__c === 'Pass';
    }
    get InspectWeldsFailcheck() {
        return this.fields.Inspect_Welds_For_Cracking__c === 'Fail';
    }
    get InspectWeldsNacheck() {
        return this.fields.Inspect_Welds_For_Cracking__c === 'Not Applicable';
    }

    get DoorRollerInspectPasscheck() {
        return this.fields.Door_Roller_Inspect_and_Lube__c === 'Pass';
    }
    get DoorRollerInspectFailcheck() {
        return this.fields.Door_Roller_Inspect_and_Lube__c === 'Fail';
    }
    get DoorRollerInspectNacheck() {
        return this.fields.Door_Roller_Inspect_and_Lube__c === 'Not Applicable';
    }

    get HingeInspectPasscheck() {
        return this.fields.Hinge_Inspect_and_Lube__c === 'Pass';
    }
    get HingeInspectFailcheck() {
        return this.fields.Hinge_Inspect_and_Lube__c === 'Fail';
    }
    get HingeInspectNacheck() {
        return this.fields.Hinge_Inspect_and_Lube__c === 'Not Applicable';
    }

    get DoorOperationSealsPasscheck() {
        return this.fields.Door_Operation_Seals__c === 'Pass';
    }
    get DoorOperationSealsFailcheck() {
        return this.fields.Door_Operation_Seals__c === 'Fail';
    }
    get DoorOperationSealsNacheck() {
        return this.fields.Door_Operation_Seals__c === 'Not Applicable';
    }

    get SpringsAirBagsHeightPasscheck() {
    return this.fields.Springs_Air_Bags_Height__c === 'Pass';
    }
    get SpringsAirBagsHeightFailcheck() {
        return this.fields.Springs_Air_Bags_Height__c === 'Fail';
    }
    get SpringsAirBagsHeightNacheck() {
        return this.fields.Springs_Air_Bags_Height__c === 'Not Applicable';
    }

    get SpringHangersPasscheck() {
        return this.fields.Spring_Hangers__c === 'Pass';
    }
    get SpringHangersFailcheck() {
        return this.fields.Spring_Hangers__c === 'Fail';
    }
    get SpringHangersNacheck() {
        return this.fields.Spring_Hangers__c === 'Not Applicable';
    }

    get FrontUBoltTorquePasscheck() {
        return this.fields.Front_U_Bolt_Torque_270_360_lb_ft__c === 'Pass';
    }
    get FrontUBoltTorqueFailcheck() {
        return this.fields.Front_U_Bolt_Torque_270_360_lb_ft__c === 'Fail';
    }
    get FrontUBoltTorqueNacheck() {
        return this.fields.Front_U_Bolt_Torque_270_360_lb_ft__c === 'Not Applicable';
    }

    get RearUBoltTorquePasscheck() {
        return this.fields.Rear_U_Bolt_Torque_420_500_lb_ft__c === 'Pass';
    }
    get RearUBoltTorqueFailcheck() {
        return this.fields.Rear_U_Bolt_Torque_420_500_lb_ft__c === 'Fail';
    }
    get RearUBoltTorqueNacheck() {
        return this.fields.Rear_U_Bolt_Torque_420_500_lb_ft__c === 'Not Applicable';
    }

    get TorqueRadiusTrackingComponentsPasscheck() {
        return this.fields.Torque_Radius_or_Tracking_Components__c === 'Pass';
    }
    get TorqueRadiusTrackingComponentsFailcheck() {
        return this.fields.Torque_Radius_or_Tracking_Components__c === 'Fail';
    }
    get TorqueRadiusTrackingComponentsNacheck() {
        return this.fields.Torque_Radius_or_Tracking_Components__c === 'Not Applicable';
    }

    get InspectReplaceCabinAirFilterPasscheck() {
        return this.fields.Inspect_Replace_Cabin_Air_Filter__c === 'Pass';
    }
    get InspectReplaceCabinAirFilterFailcheck() {
        return this.fields.Inspect_Replace_Cabin_Air_Filter__c === 'Fail';
    }
    get InspectReplaceCabinAirFilterNacheck() {
        return this.fields.Inspect_Replace_Cabin_Air_Filter__c === 'Not Applicable';
    }

    get LockOrSideRingPasscheck() {
        return this.fields.Lock_or_Side_Ring__c === 'Pass';
    }
    get LockOrSideRingFailcheck() {
        return this.fields.Lock_or_Side_Ring__c === 'Fail';
    }
    get LockOrSideRingNacheck() {
        return this.fields.Lock_or_Side_Ring__c === 'Not Applicable';
    }

    get WeldsPasscheck() {
        return this.fields.Welds__c === 'Pass';
    }
    get WeldsFailcheck() {
        return this.fields.Welds__c === 'Fail';
    }
    get WeldsNacheck() {
        return this.fields.Welds__c === 'Not Applicable';
    }

    get WheelsAndRimsPasscheck() {
    return this.fields.Wheels_and_Rims__c === 'Pass';
    }
    get WheelsAndRimsFailcheck() {
        return this.fields.Wheels_and_Rims__c === 'Fail';
    }
    get WheelsAndRimsNacheck() {
        return this.fields.Wheels_and_Rims__c === 'Not Applicable';
    }

    get StudsAndLugNutsPasscheck() {
        return this.fields.Studs_and_Lug_Nuts__c === 'Pass';
    }
    get StudsAndLugNutsFailcheck() {
        return this.fields.Studs_and_Lug_Nuts__c === 'Fail';
    }
    get StudsAndLugNutsNacheck() {
        return this.fields.Studs_and_Lug_Nuts__c === 'Not Applicable';
    }

    get WheelBearingsPasscheck() {
        return this.fields.Wheel_Bearings__c === 'Pass';
    }
    get WheelBearingsFailcheck() {
        return this.fields.Wheel_Bearings__c === 'Fail';
    }
    get WheelBearingsNacheck() {
        return this.fields.Wheel_Bearings__c === 'Not Applicable';
    }

    get AxleSealsPasscheck() {
        return this.fields.Axle_Seals__c === 'Pass';
    }
    get AxleSealsFailcheck() {
        return this.fields.Axle_Seals__c === 'Fail';
    }
    get AxleSealsNacheck() {
        return this.fields.Axle_Seals__c === 'Not Applicable';
    }

    get MudflapsPasscheck() {
        return this.fields.Mudflaps__c === 'Pass';
    }
    get MudflapsFailcheck() {
        return this.fields.Mudflaps__c === 'Fail';
    }
    get MudflapsNacheck() {
        return this.fields.Mudflaps__c === 'Not Applicable';
    }

    get TrianglesPasscheck() {
    return this.fields.Triangles__c === 'Pass';
    }
    get TrianglesFailcheck() {
        return this.fields.Triangles__c === 'Fail';
    }
    get TrianglesNacheck() {
        return this.fields.Triangles__c === 'Not Applicable';
    }

    // Extinguisher__c
    get ExtinguisherPasscheck() {
        return this.fields.Extinguisher__c === 'Pass';
    }
    get ExtinguisherFailcheck() {
        return this.fields.Extinguisher__c === 'Fail';
    }
    get ExtinguisherNacheck() {
        return this.fields.Extinguisher__c === 'Not Applicable';
    }

    // Placards_Holders__c
    get PlacardsHoldersPasscheck() {
        return this.fields.Placards_Holders__c === 'Pass';
    }
    get PlacardsHoldersFailcheck() {
        return this.fields.Placards_Holders__c === 'Fail';
    }
    get PlacardsHoldersNacheck() {
        return this.fields.Placards_Holders__c === 'Not Applicable';
    }

    // Horn__c
    get HornPasscheck() {
        return this.fields.Horn__c === 'Pass';
    }
    get HornFailcheck() {
        return this.fields.Horn__c === 'Fail';
    }
    get HornNacheck() {
        return this.fields.Horn__c === 'Not Applicable';
    }

    // Steering_Axle__c
    get SteeringAxlePasscheck() {
        return this.fields.Steering_Axle__c === 'Pass';
    }
    get SteeringAxleFailcheck() {
        return this.fields.Steering_Axle__c === 'Fail';
    }
    get SteeringAxleNacheck() {
        return this.fields.Steering_Axle__c === 'Not Applicable';
    }

    // All_Other_Tires__c
    get AllOtherTiresPasscheck() {
        return this.fields.All_Other_Tires__c === 'Pass';
    }
    get AllOtherTiresFailcheck() {
        return this.fields.All_Other_Tires__c === 'Fail';
    }
    get AllOtherTiresNacheck() {
        return this.fields.All_Other_Tires__c === 'Not Applicable';
    }

    // Completed__c
    get CompletedPasscheck() {
        return this.fields.Completed__c === 'Pass';
    }
    get CompletedFailcheck() {
        return this.fields.Completed__c === 'Fail';
    }
    get CompletedNacheck() {
        return this.fields.Completed__c === 'Not Applicable';
    }

    get Does_theDOT_InspectionDecalExpirePassCheck(){
        return this.fields.Does_the_DOT_Inspection_Decal_Expire__c === "Yes (Complete both 'B' and 'C')";
    }
    get Does_theDOT_InspectionDecalExpireFailCheck(){
        return this.fields.Does_the_DOT_Inspection_Decal_Expire__c === "No (Skip directly to 'C')";
    }

    get Does_theState_InspectionDecalExpireYesCheck(){
        return this.fields.Does_the_State_Inspection_Decal_Expire__c === "Yes (Complete Both 'E' and 'F')";
    }
    get Does_theState_InspectionDecalExpireNoCheck(){
        return this.fields.Does_the_State_Inspection_Decal_Expire__c === "No (Skip directly to 'F')";
    }
    get Does_theState_InspectionDecalExpireNaCheck(){
        return this.fields.Does_the_State_Inspection_Decal_Expire__c === "N/A";
    }

     handleAutoResize(event) {
        event.target.style.height = 'auto'; // Reset to auto
        event.target.style.height = event.target.scrollHeight + 'px'; // Adjust to fit content
    }

    handleNavigateBacks(event) {
    console.log("Dismissing modal", event.detail);
     this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId, // Ensure this.recordId is set appropriately
                objectApiName: 'Inspection_Sheet__c', // Replace with your object API name
                actionName: 'view', // Navigates to the record view page
            },
        });
  }

}
