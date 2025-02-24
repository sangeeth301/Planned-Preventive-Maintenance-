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
    @track shopName;
    @track NameOfMotorCarrier;
    @track WFSPO
    @track date;
    @track Mileage;
    @track Unit;
    @track VIN;
    @track APM_DryService;
    @track BPM_WetService;
    @track InspectAirCleanersAdvise; 
    @track GreaseFittingsFifthWheel; 
    @track CheckFillFluids; 
    @track AdjustBrakes; 
    @track CheckRegularCoolant;
    @track extentLifeCooland;
    @track EnsureAllTiresFilled100PSI;
    @track DCA_Reading;
    @track ppm;
    @track DegreeReading;
    @track gladHands;
    @track ServiceBrakes; 
    @track ParkingBrake;
    @track BrakeDrumsRotors; 
    @track HosesSpacingChaffing; 
    @track BrakeTubing; 
    @track TractorProtectionValve; 
    @track AirCompressor; 
    @track ElectricBrakes; 
    @track HydraulicBrakes; 
    @track VacuumSystems;
    @track PintleHooks; @track SaddleMounts; @track SlidingMechanism; @track FifthWheelLocksAdjustment;
    @track Not_Leaking;
    @track Won_t_burn;
    @track Wipers;
    @track WindShield;
    @track noVisibleLeaks;
    @track fillerCapNotMissing;
    @track tankSecurelyAttached;
    @track allDevices;
    @track conspicuityTape;
    @track protectionAgainstShiftingCargo;
    @track conditionOfLoading;
    @track steeringWheelFreePlay;
    @track steeringColumn;
    @track frontAxleBeamComponents;
    @track steeringGearBox;
    @track pitmanArm;
    @track powerSteering;
    @track ballAndSocketJoints;
    @track tieRodsAndDragLinks;
    @track nuts;
    @track steeringSystem;
    @track frameMembers
    @track tireAndWheelClearance
    @track adjustableAxleAssemblies
    @track damageCheck
    @track electricalInspection
    @track boxSkinCondition
    @track uBoltsTorque50lbFt
    @track inspectWeldsForCracking
    @track doorRollerInspectionAndLubrication
    @track hingeInspectionAndLubrication
    @track doorOperationSealsCheck
    @track springsAirBagsHeight
    @track springHangers
    @track frontUBoltTorque270_360lbFt
    @track rearUBoltTorque420_500lbFt
    @track torqueRadiusOrTrackingComponents
    @track InspectReplaceCabinAirFilter
    @track lockOrSideRing;
    @track welds;
    @track wheelsAndRims;
    @track studsAndLugNuts;
    @track wheelBearings;
    @track axleSeals;
    @track mudflaps;
    @track triangles;
    @track extinguisher;
    @track placardsHolders;
    @track horn;
    @track steeringAxle;
    @track allOtherTires;
    @track completed;
    @track Does_theDOT_InspectionDecalExpire;
    @track CompletedDOT_Inspection;
    @track DOT_InspectionStickerExpirationDate;
    @track DoestheStateInspectionDecalExpire;
    @track CompletedStateInspection;
    @track StateInspectionStickerExpirationDate;
    @track Commends;
    @track DigitalSignature;
    @track PrintedNameOfInspector;
    @track SignatureOfInspector;

    @track lfTires;
    @track lfBrakes;
    @track lfoTires;
    @track lfoBrakes;
    @track lfiTires;
    @track lfiBrakes;
    @track lroTires;
    @track lroBrakes;
    @track lriTires;
    @track lriBrakes;

    @track rfTires;
    @track rfBrakes;
    @track rfoTires;
    @track rfoBrakes;
    @track rfiTiers;
    @track rfiBreaks;
    @track rroTires;
    @track rroBreaks;
    @track rriTires;
    @track rriBrakes;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    loadRecord({ error, data }) {
        console.log('value========='+this.recordId);
        if (data) {
            this.shopName = data.fields.Shop_Name__c.value;
            this.NameOfMotorCarrier = data.fields.Name_Of_Motor_Carrier__c.value;
            this.date = data.fields.Date__c.value;
            this.WFSPO = data.fields.WFS_PO__c.value;
            this.Mileage = data.fields.Mileage__c.value;
            this.Unit = data.fields.Unit__c.value;
            this.VIN = data.fields.VIN__c.value;
            this.APM_DryService = data.fields.APM_Dry_Service__c.value;
            this.BPM_WetService = data.fields.BPM_Wet_Service__c.value;
            this.InspectAirCleanersAdvise = data.fields.Inspect_Air_Cleaners_and_Advise__c.value;
            this.GreaseFittingsFifthWheel = data.fields.Grease_All_Fittings_and_Fifth_Wheel__c.value;
            this.CheckFillFluids = data.fields.Check_and_Fill_All_Fluids__c.value;
            this.AdjustBrakes = data.fields.Adjust_Brakes_As_Needed__c.value;
            this.CheckRegularCoolant = data.fields.Check_Regular_Coolant__c.value;
            this.EnsureAllTiresFilled100PSI= data.fields.Ensure_All_Tires_Are_Filled_To_100_PSI__c.value;
            this.extentLifeCooland= data.fields.Extended_Life_Coolant_Check_FPL__c.value;
            this.DCA_Reading = data.fields.DCA_Reading__c.value;
            this.ppm = data.fields.ppm__c.value;
            this.DegreeReading = data.fields.Degree_Reading__c.value;
            this.gladHands = data.fields.Glad_Hands__c.value;
            this.ServiceBrakes = data.fields.Service_Brakes__c.value; 
            this.ParkingBrake = data.fields.Parking_Brake__c.value; 
            this.BrakeDrumsRotors = data.fields.Brake_Drums_or_Rotors__c.value; 
            this.HosesSpacingChaffing = data.fields.Hoses_Spacing_Chaffing__c.value; 
            this.BrakeTubing = data.fields.Brake_Tubing__c.value; 
            this.TractorProtectionValve = data.fields.Tractor_Protection_Valve__c.value; 
            this.AirCompressor = data.fields.Air_Compressor__c.value; 
            this.ElectricBrakes = data.fields.Electric_Brakes__c.value; 
            this.HydraulicBrakes = data.fields.Hydraulic_Brakes__c.value; 
            this.VacuumSystems = data.fields.Vacuum_Systems__c.value;
            this.PintleHooks = data.fields.Pintle_Hooks__c.value; 
            this.SaddleMounts = data.fields.Saddle_Mounts__c.value; 
            this.SlidingMechanism = data.fields.Sliding_Mechanism__c.value; 
            this.FifthWheelLocksAdjustment = data.fields.Fifth_Wheel_Locks_Adjustment__c.value;
            this.Not_Leaking = data.fields.Not_Leaking__c.value;
            this.Won_t_burn = data.fields.Won_t_burn__c.value;
            this.Wipers = data.fields.Wipers__c.value;
            this.WindShield = data.fields.WindShield__c.value;
            this.noVisibleLeaks = data.fields.No_Visible_Leaks__c.value;
            this.fillerCapNotMissing = data.fields.Filler_Cap_Not_Missing__c.value;
            this.tankSecurelyAttached = data.fields.Tank_Securely_Attached__c.value;
            this.allDevices = data.fields.All_Devices__c.value;
            this.conspicuityTape = data.fields.Conspicuity_Tape__c.value;
            this.protectionAgainstShiftingCargo = data.fields.Protection_Against_Shifting_Cargo__c.value;
            this.conditionOfLoading = data.fields.Condition_Of_Loading__c.value;
            this.steeringWheelFreePlay = data.fields.Steering_Wheel_Free_Play__c.value;
            this.steeringColumn = data.fields.Steering_Column__c.value;
            this.frontAxleBeamComponents = data.fields.Front_Axie_Beam_Components__c.value;
            this.steeringGearBox = data.fields.Steering_Gear_Box__c.value;
            this.pitmanArm = data.fields.Pitman_Arm__c.value;
            this.powerSteering = data.fields.Power_Steering__c.value;
            this.ballAndSocketJoints = data.fields.Ball_and_Socket_Joints__c.value;
            this.tieRodsAndDragLinks = data.fields.Tie_Rods_and_Drag_Links__c.value;
            this.nuts = data.fields.Nuts__c.value;
            this.steeringSystem = data.fields.Steering_System__c.value;
            this.frameMembers = data.fields.Adjustable_Axle_Assemblies__c.value;
            this.tireAndWheelClearance = data.fields.Frame_Members__c.value;
            this.adjustableAxleAssemblies = data.fields.Tire_and_Wheel_Clearance__c.value;
            this.damageCheck = data.fields.Damage__c.value;
            this.electricalInspection = data.fields.Electrical__c.value;
            this.boxSkinCondition = data.fields.Box_Skin__c.value;
            this.uBoltsTorque50lbFt = data.fields.U_Bolts_Torque_50_llb_ft__c.value;
            this.inspectWeldsForCracking = data.fields.Inspect_Welds_For_Cracking__c.value;
            this.doorRollerInspectionAndLubrication = data.fields.Door_Roller_Inspect_and_Lube__c.value;
            this.hingeInspectionAndLubrication = data.fields.Hinge_Inspect_and_Lube__c.value;
            this.doorOperationSealsCheck = data.fields.Door_Operation_Seals__c.value;
            this.springsAirBagsHeight = data.fields.Springs_Air_Bags_Height__c.value;
            this.springHangers = data.fields.Spring_Hangers__c.value;
            this.frontUBoltTorque270_360lbFt = data.fields.Front_U_Bolt_Torque_270_360_lb_ft__c.value;
            this.rearUBoltTorque420_500lbFt = data.fields.Rear_U_Bolt_Torque_420_500_lb_ft__c.value;
            this.torqueRadiusOrTrackingComponents = data.fields.Torque_Radius_or_Tracking_Components__c.value;
            this.InspectReplaceCabinAirFilter = data.fields.Inspect_Replace_Cabin_Air_Filter__c.value;
            this.lockOrSideRing = data.fields.Lock_or_Side_Ring__c.value;
            this.welds = data.fields.Welds__c.value;
            this.wheelsAndRims = data.fields.Wheels_and_Rims__c.value;
            this.studsAndLugNuts = data.fields.Studs_and_Lug_Nuts__c.value;
            this.wheelBearings = data.fields.Wheel_Bearings__c.value;
            this.axleSeals = data.fields.Axle_Seals__c.value;
            this.mudflaps = data.fields.Mudflaps__c.value;
            this.triangles = data.fields.Triangles__c.value;
            this.extinguisher = data.fields.Extinguisher__c.value;
            this.placardsHolders = data.fields.Placards_Holders__c.value;
            this.horn = data.fields.Horn__c.value;
            this.steeringAxle = data.fields.Steering_Axle__c.value;
            this.allOtherTires = data.fields.All_Other_Tires__c.value;
            this.completed = data.fields.Completed__c.value;
            this.Does_theDOT_InspectionDecalExpire = data.fields.Does_the_DOT_Inspection_Decal_Expire__c.value;
            this.CompletedDOT_Inspection = data.fields.Completed_DOT_Inspection__c.value;
            this.DOT_InspectionStickerExpirationDate = data.fields.DOT_Inspection_Expiration_Date__c.value;
            this.DoestheStateInspectionDecalExpire = data.fields.Does_the_State_Inspection_Decal_Expire__c.value;
            this.CompletedStateInspection = data.fields.Completed_State_Inspection__c.value;
            this.StateInspectionStickerExpirationDate = data.fields.State_Inspection_Sticker_Expiration_Date__c.value;
            this.Commends = data.fields.Comments__c.value;
            this.DigitalSignature = data.fields.Digital_Signature__c.value;
            this.PrintedNameOfInspector = data.fields.Printed_Name_of_Inspector__c.value;
            this.SignatureOfInspector = data.fields.Signature_of_Inspector__c.value;

            this.lfTires = data.fields.LF_Tires__c.value;
            this.lfBrakes = data.fields.LF_Brakes__c.value;
            this.lfoTires = data.fields.LFO_Tires__c.value;
            this.lfoBrakes = data.fields.LFO_Brakes__c.value;
            this.lfiTires = data.fields.LFI_Tires__c.value;
            this.lfiBrakes = data.fields.LFI_Brakes__c.value;
            this.lroTires = data.fields.LRO_Tires__c.value;
            this.lroBrakes = data.fields.LRO_Brakes__c.value;
            this.lriTires = data.fields.LRI_Tires__c.value;
            this.lriBrakes = data.fields.LRI_Brakes__c.value;

            this.rfTires = data.fields.RF_Tires__c.value;
            this.rfBrakes = data.fields.RF_Brakes__c.value;
            this.rfoTires = data.fields.RFO_Tires__c.value;
            this.rfoBrakes = data.fields.RFO_Brakes__c.value;
            this.rfiTiers = data.fields.RFI_Tiers__c.value;
            this.rfiBreaks = data.fields.RFI_Breaks__c.value;
            this.rroTires = data.fields.RRO_Tires__c.value;
            this.rroBreaks = data.fields.RRO_Breaks__c.value;
            this.rriTires = data.fields.RRI_Tires__c.value;
            this.rriBrakes = data.fields.RRI_Brakes__c.value;



        } else if (error) {
            console.error("Error fetching record data: ", error);
        }
    }
    
    get apmImage() {
        return this.APM_DryService
            ? '/resource/Checkbox_With_Tick' 
            : '/resource/Checkbox_Without_Tick';
    }
    get bpmImage() {
        return  this.BPM_WetService
            ? '/resource/Checkbox_With_Tick' 
            : '/resource/Checkbox_Without_Tick';
    }
    get airCleanerImage() { 
        return this.InspectAirCleanersAdvise 
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick'; 
    }
    get greaseFittingsImage() {
         return this.GreaseFittingsFifthWheel 
         ? 
         '/resource/Checkbox_With_Tick' : 
         '/resource/Checkbox_Without_Tick'; 
    } 
    get fillFluidsImage() {
         return this.CheckFillFluids 
         ? '/resource/Checkbox_With_Tick' : 
         '/resource/Checkbox_Without_Tick'; 
    } 
    get adjustBrakesImage() {
         return this.AdjustBrakes 
         ? '/resource/Checkbox_With_Tick' 
         : '/resource/Checkbox_Without_Tick'; 
    } 
    get coolantImage() { 
        return this.CheckRegularCoolant 
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick';
    }
    get extentLifeCoolandimg(){
        return this.extentLifeCooland 
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick';
    }
    get EnsureAllTiresFilled100PSImage(){
        return this.EnsureAllTiresFilled100PSI 
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick';
    }
    get CompletedDOT_InspectionImg(){
        return this.CompletedDOT_Inspection
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick';
    }
    get CompletedStateInspectionImg(){
        return this.CompletedStateInspection
        ? '/resource/Checkbox_With_Tick' 
        : '/resource/Checkbox_Without_Tick';
    }
    get DigitalSignatureImg() {
        return this.DigitalSignature
            ? '/resource/Checkbox_With_Tick' 
            : '/resource/Checkbox_Without_Tick';
    }
   
   getCheckboxImage(componentValue, statusToCheck) {
    return componentValue === statusToCheck ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick';
    }

// Use helper method for all getters
    get gladHandsPassImg() { return this.getCheckboxImage(this.gladHands, 'Pass'); }
    get gladHandsFailImg() { return this.getCheckboxImage(this.gladHands, 'Fail'); }
    get gladHandsNaImg() { return this.getCheckboxImage(this.gladHands, 'Not Applicable'); }

    get serviceBrakesPassImg() { return this.getCheckboxImage(this.ServiceBrakes, 'Pass'); }
    get serviceBrakesFailImg() { return this.getCheckboxImage(this.ServiceBrakes, 'Fail'); }
    get serviceBrakesNaImg() { return this.getCheckboxImage(this.ServiceBrakes, 'Not Applicable'); }

    get parkingBrakePassImg() { return this.getCheckboxImage(this.ParkingBrake, 'Pass'); }
    get parkingBrakeFailImg() { return this.getCheckboxImage(this.ParkingBrake, 'Fail'); }
    get parkingBrakeNaImg() { return this.getCheckboxImage(this.ParkingBrake, 'Not Applicable'); }

    get brakeDrumsRotorsPassImg() { return this.getCheckboxImage(this.BrakeDrumsRotors, 'Pass'); }
    get brakeDrumsRotorsFailImg() { return this.getCheckboxImage(this.BrakeDrumsRotors, 'Fail'); }
    get brakeDrumsRotorsNaImg() { return this.getCheckboxImage(this.BrakeDrumsRotors, 'Not Applicable'); }
    
    get parkingBrakePassImg() { return this.getCheckboxImage(this.ParkingBrake, 'Pass'); }
    get parkingBrakeFailImg() { return this.getCheckboxImage(this.ParkingBrake, 'Fail'); }
    get parkingBrakeNaImg() { return this.getCheckboxImage(this.ParkingBrake, 'Not Applicable'); }

    get brakeDrumsRotorsPassImg() { return this.getCheckboxImage(this.BrakeDrumsRotors, 'Pass'); }
    get brakeDrumsRotorsFailImg() { return this.getCheckboxImage(this.BrakeDrumsRotors, 'Fail'); }
    get brakeDrumsRotorsNaImg() { return this.getCheckboxImage(this.BrakeDrumsRotors, 'Not Applicable'); }

    get hosesSpacingChaffingPassImg() { return this.getCheckboxImage(this.HosesSpacingChaffing, 'Pass'); }
    get hosesSpacingChaffingFailImg() { return this.getCheckboxImage(this.HosesSpacingChaffing, 'Fail'); }
    get hosesSpacingChaffingNaImg() { return this.getCheckboxImage(this.HosesSpacingChaffing, 'Not Applicable'); }

    get brakeTubingPassImg() { return this.getCheckboxImage(this.BrakeTubing, 'Pass'); }
    get brakeTubingFailImg() { return this.getCheckboxImage(this.BrakeTubing, 'Fail'); }
    get brakeTubingNaImg() { return this.getCheckboxImage(this.BrakeTubing, 'Not Applicable'); }

    get tractorProtectionValvePassImg() { return this.getCheckboxImage(this.TractorProtectionValve, 'Pass'); }
    get tractorProtectionValveFailImg() { return this.getCheckboxImage(this.TractorProtectionValve, 'Fail'); }
    get tractorProtectionValveNaImg() { return this.getCheckboxImage(this.TractorProtectionValve, 'Not Applicable'); }

    get airCompressorPassImg() { return this.getCheckboxImage(this.AirCompressor, 'Pass'); }
    get airCompressorFailImg() { return this.getCheckboxImage(this.AirCompressor, 'Fail'); }
    get airCompressorNaImg() { return this.getCheckboxImage(this.AirCompressor, 'Not Applicable'); }

    get electricBrakesPassImg() { return this.getCheckboxImage(this.ElectricBrakes, 'Pass'); }
    get electricBrakesFailImg() { return this.getCheckboxImage(this.ElectricBrakes, 'Fail'); }
    get electricBrakesNaImg() { return this.getCheckboxImage(this.ElectricBrakes, 'Not Applicable'); }

    get hydraulicBrakesPassImg() { return this.getCheckboxImage(this.HydraulicBrakes, 'Pass'); }
    get hydraulicBrakesFailImg() { return this.getCheckboxImage(this.HydraulicBrakes, 'Fail'); }
    get hydraulicBrakesNaImg() { return this.getCheckboxImage(this.HydraulicBrakes, 'Not Applicable'); }

    get vacuumSystemsPassImg() { return this.getCheckboxImage(this.VacuumSystems, 'Pass'); }
    get vacuumSystemsFailImg() { return this.getCheckboxImage(this.VacuumSystems, 'Fail'); }
    get vacuumSystemsNaImg() { return this.getCheckboxImage(this.VacuumSystems, 'Not Applicable'); }

    
    /*-----------------------------------------breaks ends--------------------------*/

    get pintleHooksPassImg() { return this.getCheckboxImage(this.PintleHooks, 'Pass'); }
    get pintleHooksFailImg() { return this.getCheckboxImage(this.PintleHooks, 'Fail'); }
    get pintleHooksNaImg() { return this.getCheckboxImage(this.PintleHooks, 'Not Applicable'); }

    get saddleMountsPassImg() { return this.getCheckboxImage(this.SaddleMounts, 'Pass'); }
    get saddleMountsFailImg() { return this.getCheckboxImage(this.SaddleMounts, 'Fail'); }
    get saddleMountsNaImg() { return this.getCheckboxImage(this.SaddleMounts, 'Not Applicable'); }

    get slidingMechanismPassImg() { return this.getCheckboxImage(this.SlidingMechanism, 'Pass'); }
    get slidingMechanismFailImg() { return this.getCheckboxImage(this.SlidingMechanism, 'Fail'); }
    get slidingMechanismNaImg() { return this.getCheckboxImage(this.SlidingMechanism, 'Not Applicable'); }

    get fifthWheelLocksPassImg() { return this.getCheckboxImage(this.FifthWheelLocksAdjustment, 'Pass'); }
    get fifthWheelLocksFailImg() { return this.getCheckboxImage(this.FifthWheelLocksAdjustment, 'Fail'); }
    get fifthWheelLocksNaImg() { return this.getCheckboxImage(this.FifthWheelLocksAdjustment, 'Not Applicable'); }

   
   /*----------------------------------------coupling tools ends--------------------------*/

    get notLeakingPassImg() { return this.getCheckboxImage(this.Not_Leaking, 'Pass'); }
    get notLeakingFailImg() { return this.getCheckboxImage(this.Not_Leaking, 'Fail'); }
    get notLeakingNaImg() { return this.getCheckboxImage(this.Not_Leaking, 'Not Applicable'); }

    get wontBurnPassImg() { return this.getCheckboxImage(this.Won_t_burn, 'Pass'); }
    get wontBurnFailImg() { return this.getCheckboxImage(this.Won_t_burn, 'Fail'); }
    get wontBurnNaImg() { return this.getCheckboxImage(this.Won_t_burn, 'Not Applicable'); }


 /*----------------------------------------EXHAUST SYSTEM ends--------------------------*/

    get wipersPassImg() { return this.getCheckboxImage(this.Wipers, 'Pass'); }
    get wipersFailImg() { return this.getCheckboxImage(this.Wipers, 'Fail'); }
    get wipersNaImg() { return this.getCheckboxImage(this.Wipers, 'Not Applicable'); }

    get windShieldPassImg() { return this.getCheckboxImage(this.WindShield, 'Pass'); }
    get windShieldFailImg() { return this.getCheckboxImage(this.WindShield, 'Fail'); }
    get windShieldNaImg() { return this.getCheckboxImage(this.WindShield, 'Not Applicable'); }


 /*----------------------------------------Winshild,wiper ends--------------------------*/

    get noVisibleLeaksPassImg() { return this.getCheckboxImage(this.noVisibleLeaks, 'Pass'); }
    get noVisibleLeaksFailImg() { return this.getCheckboxImage(this.noVisibleLeaks, 'Fail'); }
    get noVisibleLeaksNaImg() { return this.getCheckboxImage(this.noVisibleLeaks, 'Not Applicable'); }

    get fillerCapNotMissingPassImg() { return this.getCheckboxImage(this.fillerCapNotMissing, 'Pass'); }
    get fillerCapNotMissingFailImg() { return this.getCheckboxImage(this.fillerCapNotMissing, 'Fail'); }
    get fillerCapNotMissingNaImg() { return this.getCheckboxImage(this.fillerCapNotMissing, 'Not Applicable'); }

    get tankSecurelyAttachedPassImg() { return this.getCheckboxImage(this.tankSecurelyAttached, 'Pass'); }
    get tankSecurelyAttachedFailImg() { return this.getCheckboxImage(this.tankSecurelyAttached, 'Fail'); }
    get tankSecurelyAttachedNaImg() { return this.getCheckboxImage(this.tankSecurelyAttached, 'Not Applicable'); }


/*----------------------------------------fuel system ends--------------------------*/
    get allDevicesPassImg() { return this.getCheckboxImage(this.allDevices, 'Pass'); }
    get allDevicesFailImg() { return this.getCheckboxImage(this.allDevices, 'Fail'); }
    get allDevicesNaImg() { return this.getCheckboxImage(this.allDevices, 'Not Applicable'); }

    get conspicuityTapePassImg() { return this.getCheckboxImage(this.conspicuityTape, 'Pass'); }
    get conspicuityTapeFailImg() { return this.getCheckboxImage(this.conspicuityTape, 'Fail'); }
    get conspicuityTapeNaImg() { return this.getCheckboxImage(this.conspicuityTape, 'Not Applicable'); }


/*----------------------------------------lightnig/refle ends--------------------------*/

    get protectionAgainstShiftingCargoPassImg() { return this.getCheckboxImage(this.protectionAgainstShiftingCargo, 'Pass'); }
    get protectionAgainstShiftingCargoFailImg() { return this.getCheckboxImage(this.protectionAgainstShiftingCargo, 'Fail'); }
    get protectionAgainstShiftingCargoNaImg() { return this.getCheckboxImage(this.protectionAgainstShiftingCargo, 'Not Applicable'); }

    get conditionOfLoadingPassImg() { return this.getCheckboxImage(this.conditionOfLoading, 'Pass'); }
    get conditionOfLoadingFailImg() { return this.getCheckboxImage(this.conditionOfLoading, 'Fail'); }
    get conditionOfLoadingNaImg() { return this.getCheckboxImage(this.conditionOfLoading, 'Not Applicable'); }


/*----------------------------------------safe loading ends--------------------------*/

    get steeringWheelFreePlayPassImg() { return this.getCheckboxImage(this.steeringWheelFreePlay, 'Pass'); }
    get steeringWheelFreePlayFailImg() { return this.getCheckboxImage(this.steeringWheelFreePlay, 'Fail'); }
    get steeringWheelFreePlayNaImg() { return this.getCheckboxImage(this.steeringWheelFreePlay, 'Not Applicable'); }

    get steeringColumnPassImg() { return this.getCheckboxImage(this.steeringColumn, 'Pass'); }
    get steeringColumnFailImg() { return this.getCheckboxImage(this.steeringColumn, 'Fail'); }
    get steeringColumnNaImg() { return this.getCheckboxImage(this.steeringColumn, 'Not Applicable'); }

    get frontAxleBeamComponentsPassImg() { return this.getCheckboxImage(this.frontAxleBeamComponents, 'Pass'); }
    get frontAxleBeamComponentsFailImg() { return this.getCheckboxImage(this.frontAxleBeamComponents, 'Fail'); }
    get frontAxleBeamComponentsNaImg() { return this.getCheckboxImage(this.frontAxleBeamComponents, 'Not Applicable'); }

    get steeringGearBoxPassImg() { return this.getCheckboxImage(this.steeringGearBox, 'Pass'); }
    get steeringGearBoxFailImg() { return this.getCheckboxImage(this.steeringGearBox, 'Fail'); }
    get steeringGearBoxNaImg() { return this.getCheckboxImage(this.steeringGearBox, 'Not Applicable'); }

    get pitmanArmPassImg() { return this.getCheckboxImage(this.pitmanArm, 'Pass'); }
    get pitmanArmFailImg() { return this.getCheckboxImage(this.pitmanArm, 'Fail'); }
    get pitmanArmNaImg() { return this.getCheckboxImage(this.pitmanArm, 'Not Applicable'); }

    get powerSteeringPassImg() { return this.getCheckboxImage(this.powerSteering, 'Pass'); }
    get powerSteeringFailImg() { return this.getCheckboxImage(this.powerSteering, 'Fail'); }
    get powerSteeringNaImg() { return this.getCheckboxImage(this.powerSteering, 'Not Applicable'); }

    get ballAndSocketJointsPassImg() { return this.getCheckboxImage(this.ballAndSocketJoints, 'Pass'); }
    get ballAndSocketJointsFailImg() { return this.getCheckboxImage(this.ballAndSocketJoints, 'Fail'); }
    get ballAndSocketJointsNaImg() { return this.getCheckboxImage(this.ballAndSocketJoints, 'Not Applicable'); }

    get tieRodsAndDragLinksPassImg() { return this.getCheckboxImage(this.tieRodsAndDragLinks, 'Pass'); }
    get tieRodsAndDragLinksFailImg() { return this.getCheckboxImage(this.tieRodsAndDragLinks, 'Fail'); }
    get tieRodsAndDragLinksNaImg() { return this.getCheckboxImage(this.tieRodsAndDragLinks, 'Not Applicable'); }

    get nutsPassImg() { return this.getCheckboxImage(this.nuts, 'Pass'); }
    get nutsFailImg() { return this.getCheckboxImage(this.nuts, 'Fail'); }
    get nutsNaImg() { return this.getCheckboxImage(this.nuts, 'Not Applicable'); }

    get steeringSystemPassImg() { return this.getCheckboxImage(this.steeringSystem, 'Pass'); }
    get steeringSystemFailImg() { return this.getCheckboxImage(this.steeringSystem, 'Fail'); }
    get steeringSystemNaImg() { return this.getCheckboxImage(this.steeringSystem, 'Not Applicable'); }


/*----------------------------------------steering mechnisun ends--------------------------*/

    get frameMembersPassImg() { return this.getCheckboxImage(this.frameMembers, 'Pass'); }
    get frameMembersFailImg() { return this.getCheckboxImage(this.frameMembers, 'Fail'); }
    get frameMembersNaImg() { return this.getCheckboxImage(this.frameMembers, 'Not Applicable'); }

    get tireAndWheelClearancePassImg() { return this.getCheckboxImage(this.tireAndWheelClearance, 'Pass'); }
    get tireAndWheelClearanceFailImg() { return this.getCheckboxImage(this.tireAndWheelClearance, 'Fail'); }
    get tireAndWheelClearanceNaImg() { return this.getCheckboxImage(this.tireAndWheelClearance, 'Not Applicable'); }

    get adjustableAxleAssembliesPassImg() { return this.getCheckboxImage(this.adjustableAxleAssemblies, 'Pass'); }
    get adjustableAxleAssembliesFailImg() { return this.getCheckboxImage(this.adjustableAxleAssemblies, 'Fail'); }
    get adjustableAxleAssembliesNaImg() { return this.getCheckboxImage(this.adjustableAxleAssemblies, 'Not Applicable'); }


/*----------------------------------------frame ends--------------------------*/

    get damageCheckPassImg() { return this.getCheckboxImage(this.damageCheck, 'Pass'); }
    get damageCheckFailImg() { return this.getCheckboxImage(this.damageCheck, 'Fail'); }
    get damageCheckNaImg() { return this.getCheckboxImage(this.damageCheck, 'Not Applicable'); }

    get electricalInspectionPassImg() { return this.getCheckboxImage(this.electricalInspection, 'Pass'); }
    get electricalInspectionFailImg() { return this.getCheckboxImage(this.electricalInspection, 'Fail'); }
    get electricalInspectionNaImg() { return this.getCheckboxImage(this.electricalInspection, 'Not Applicable'); }

    get boxSkinConditionPassImg() { return this.getCheckboxImage(this.boxSkinCondition, 'Pass'); }
    get boxSkinConditionFailImg() { return this.getCheckboxImage(this.boxSkinCondition, 'Fail'); }
    get boxSkinConditionNaImg() { return this.getCheckboxImage(this.boxSkinCondition, 'Not Applicable'); }

    get uBoltsTorque50lbFtPassImg() { return this.getCheckboxImage(this.uBoltsTorque50lbFt, 'Pass'); }
    get uBoltsTorque50lbFtFailImg() { return this.getCheckboxImage(this.uBoltsTorque50lbFt, 'Fail'); }
    get uBoltsTorque50lbFtNaImg() { return this.getCheckboxImage(this.uBoltsTorque50lbFt, 'Not Applicable'); }

    get inspectWeldsForCrackingPassImg() { return this.getCheckboxImage(this.inspectWeldsForCracking, 'Pass'); }
    get inspectWeldsForCrackingFailImg() { return this.getCheckboxImage(this.inspectWeldsForCracking, 'Fail'); }
    get inspectWeldsForCrackingNaImg() { return this.getCheckboxImage(this.inspectWeldsForCracking, 'Not Applicable'); }

    get doorRollerInspectionAndLubricationPassImg() { return this.getCheckboxImage(this.doorRollerInspectionAndLubrication, 'Pass'); }
    get doorRollerInspectionAndLubricationFailImg() { return this.getCheckboxImage(this.doorRollerInspectionAndLubrication, 'Fail'); }
    get doorRollerInspectionAndLubricationNaImg() { return this.getCheckboxImage(this.doorRollerInspectionAndLubrication, 'Not Applicable'); }

    get hingeInspectionAndLubricationPassImg() { return this.getCheckboxImage(this.hingeInspectionAndLubrication, 'Pass'); }
    get hingeInspectionAndLubricationFailImg() { return this.getCheckboxImage(this.hingeInspectionAndLubrication, 'Fail'); }
    get hingeInspectionAndLubricationNaImg() { return this.getCheckboxImage(this.hingeInspectionAndLubrication, 'Not Applicable'); }

    get doorOperationSealsCheckPassImg() { return this.getCheckboxImage(this.doorOperationSealsCheck, 'Pass'); }
    get doorOperationSealsCheckFailImg() { return this.getCheckboxImage(this.doorOperationSealsCheck, 'Fail'); }
    get doorOperationSealsCheckNaImg() { return this.getCheckboxImage(this.doorOperationSealsCheck, 'Not Applicable'); }

    
/*----------------------------------------Body ends--------------------------*/

    get springsAirBagsHeightPassImg() { return this.getCheckboxImage(this.springsAirBagsHeight, 'Pass'); }
    get springsAirBagsHeightFailImg() { return this.getCheckboxImage(this.springsAirBagsHeight, 'Fail'); }
    get springsAirBagsHeightNaImg() { return this.getCheckboxImage(this.springsAirBagsHeight, 'Not Applicable'); }

    get springHangersPassImg() { return this.getCheckboxImage(this.springHangers, 'Pass'); }
    get springHangersFailImg() { return this.getCheckboxImage(this.springHangers, 'Fail'); }
    get springHangersNaImg() { return this.getCheckboxImage(this.springHangers, 'Not Applicable'); }

    get frontUBoltTorque270_360lbFtPassImg() { return this.getCheckboxImage(this.frontUBoltTorque270_360lbFt, 'Pass'); }
    get frontUBoltTorque270_360lbFtFailImg() { return this.getCheckboxImage(this.frontUBoltTorque270_360lbFt, 'Fail'); }
    get frontUBoltTorque270_360lbFtNaImg() { return this.getCheckboxImage(this.frontUBoltTorque270_360lbFt, 'Not Applicable'); }

    get rearUBoltTorque420_500lbFtPassImg() { return this.getCheckboxImage(this.rearUBoltTorque420_500lbFt, 'Pass'); }
    get rearUBoltTorque420_500lbFtFailImg() { return this.getCheckboxImage(this.rearUBoltTorque420_500lbFt, 'Fail'); }
    get rearUBoltTorque420_500lbFtNaImg() { return this.getCheckboxImage(this.rearUBoltTorque420_500lbFt, 'Not Applicable'); }

    get torqueRadiusOrTrackingComponentsPassImg() { return this.getCheckboxImage(this.torqueRadiusOrTrackingComponents, 'Pass'); }
    get torqueRadiusOrTrackingComponentsFailImg() { return this.getCheckboxImage(this.torqueRadiusOrTrackingComponents, 'Fail'); }
    get torqueRadiusOrTrackingComponentsNaImg() { return this.getCheckboxImage(this.torqueRadiusOrTrackingComponents, 'Not Applicable'); }

    
    /*------------------------------rear suspension ends------------------------------------*/

        get InspectReplaceCabinAirFilterPassimg() { return this.getCheckboxImage(this.InspectReplaceCabinAirFilter, 'Pass');  } 
    get InspectReplaceCabinAirFilterFailImg() { return this.getCheckboxImage(this.InspectReplaceCabinAirFilter, 'Fail'); }
    get InspectReplaceCabinAirFilterNaImg() { return this.getCheckboxImage(this.InspectReplaceCabinAirFilter, 'Not Applicable'); }


   /*------------------------------HVAC ends------------------------------------*/ 

    get lockOrSideRingPassImg() { return this.getCheckboxImage(this.lockOrSideRing, 'Pass'); }
    get lockOrSideRingFailImg() { return this.getCheckboxImage(this.lockOrSideRing, 'Fail'); }
    get lockOrSideRingNaImg() { return this.getCheckboxImage(this.lockOrSideRing, 'Not Applicable'); }

    get weldsPassImg() { return this.getCheckboxImage(this.welds, 'Pass'); }
    get weldsFailImg() { return this.getCheckboxImage(this.welds, 'Fail'); }
    get weldsNaImg() { return this.getCheckboxImage(this.welds, 'Not Applicable'); }

    get wheelsAndRimsPassImg() { return this.getCheckboxImage(this.wheelsAndRims, 'Pass'); }
    get wheelsAndRimsFailImg() { return this.getCheckboxImage(this.wheelsAndRims, 'Fail'); }
    get wheelsAndRimsNaImg() { return this.getCheckboxImage(this.wheelsAndRims, 'Not Applicable'); }

    get studsAndLugNutsPassImg() { return this.getCheckboxImage(this.studsAndLugNuts, 'Pass'); }
    get studsAndLugNutsFailImg() { return this.getCheckboxImage(this.studsAndLugNuts, 'Fail'); }
    get studsAndLugNutsNaImg() { return this.getCheckboxImage(this.studsAndLugNuts, 'Not Applicable'); }

    get wheelBearingsPassImg() { return this.getCheckboxImage(this.wheelBearings, 'Pass'); }
    get wheelBearingsFailImg() { return this.getCheckboxImage(this.wheelBearings, 'Fail'); }
    get wheelBearingsNaImg() { return this.getCheckboxImage(this.wheelBearings, 'Not Applicable'); }

    get axleSealsPassImg() { return this.getCheckboxImage(this.axleSeals, 'Pass'); }
    get axleSealsFailImg() { return this.getCheckboxImage(this.axleSeals, 'Fail'); }
    get axleSealsNaImg() { return this.getCheckboxImage(this.axleSeals, 'Not Applicable'); }

    get mudflapsPassImg() { return this.getCheckboxImage(this.mudflaps, 'Pass'); }
    get mudflapsFailImg() { return this.getCheckboxImage(this.mudflaps, 'Fail'); }
    get mudflapsNaImg() { return this.getCheckboxImage(this.mudflaps, 'Not Applicable'); }

    
    /*------------------------------Wheels and rims ends------------------------------------*/ 

    get trianglesPassImg() { return this.getCheckboxImage(this.triangles, 'Pass'); }
    get trianglesFailImg() { return this.getCheckboxImage(this.triangles, 'Fail'); }
    get trianglesNaImg() { return this.getCheckboxImage(this.triangles, 'Not Applicable'); }

    get extinguisherPassImg() { return this.getCheckboxImage(this.extinguisher, 'Pass'); }
    get extinguisherFailImg() { return this.getCheckboxImage(this.extinguisher, 'Fail'); }
    get extinguisherNaImg() { return this.getCheckboxImage(this.extinguisher, 'Not Applicable'); }

    get placardsHoldersPassImg() { return this.getCheckboxImage(this.placardsHolders, 'Pass'); }
    get placardsHoldersFailImg() { return this.getCheckboxImage(this.placardsHolders, 'Fail'); }
    get placardsHoldersNaImg() { return this.getCheckboxImage(this.placardsHolders, 'Not Applicable'); }

    get hornPassImg() { return this.getCheckboxImage(this.horn, 'Pass'); }
    get hornFailImg() { return this.getCheckboxImage(this.horn, 'Fail'); }
    get hornNaImg() { return this.getCheckboxImage(this.horn, 'Not Applicable'); }

    
    /*------------------------------safty ends------------------------------------*/ 

    get steeringAxlePassImg() { return this.getCheckboxImage(this.steeringAxle, 'Pass'); }
    get steeringAxleFailImg() { return this.getCheckboxImage(this.steeringAxle, 'Fail'); }
    get steeringAxleNaImg() { return this.getCheckboxImage(this.steeringAxle, 'Not Applicable'); }

    get allOtherTiresPassImg() { return this.getCheckboxImage(this.allOtherTires, 'Pass'); }
    get allOtherTiresFailImg() { return this.getCheckboxImage(this.allOtherTires, 'Fail'); }
    get allOtherTiresNaImg() { return this.getCheckboxImage(this.allOtherTires, 'Not Applicable'); }
 
    
/*------------------------------tires ends------------------------------------*/ 

    get completedPassImg() { return this.getCheckboxImage(this.completed, 'Pass'); }
    get completedFailImg() { return this.getCheckboxImage(this.completed, 'Fail'); }
    get completedNaImg() { return this.getCheckboxImage(this.completed, 'Not Applicable'); }

   /*------------------------------completed ends------------------------------------*/  

    get Does_theDOT_InspectionDecalExpirePassImg() { return this.Does_theDOT_InspectionDecalExpire === "Yes (Complete both 'B' and 'C')" ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get Does_theDOT_InspectionDecalExpireFailImg() { return this.Does_theDOT_InspectionDecalExpire === "No (Skip directly to 'C')" ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 

    get DoestheStateInspectionDecalExpirePassImg() { return this.DoestheStateInspectionDecalExpire === "Yes (Complete Both 'E' and 'F')" ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get DoestheStateInspectionDecalFailExpire() { return this.DoestheStateInspectionDecalExpire === "No (Skip directly to 'F')" ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get DoestheStateInspectionDecalNAExpire() { return this.DoestheStateInspectionDecalExpire === 'N/A' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    
    get airCleanersImage() {
        return '/resource/Checkbox_Without_Tick';
    }

/*-----------------------------------------------------------------------Create Button----------------------------------------------------------------------------------------------------------------------------------------*/

    isEditPage = false;
    @track isSignatureAdded = false;
    @track showSignaturePad = false;
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

    // Close Signature Modal
    closeSignaturePad() {
        this.showSignaturePad = false;
        this.isSignatureAdded = false;
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
    
    
    get gladHandsPasscheck() { return this.gladHands === 'Pass'; }get gladHandsFailcheck() { return this.gladHands === 'Fail'; }get gladHandsNacheck() { return this.gladHands === 'Not Applicable'; }
    get ServiceBrakesPasscheck() { return this.ServiceBrakes === 'Pass'; }get ServiceBrakesFailcheck() { return this.ServiceBrakes === 'Fail'; }get ServiceBrakesNacheck() { return this.ServiceBrakes === 'Not Applicable'; }
    get parkingBrakesPasscheck() { return this.ParkingBrake === 'Pass'; }get parkingBreaksFailcheck() { return this.ParkingBrake === 'Fail'; }get parkingBrakesNacheck() { return this.ParkingBrake === 'Not Applicable'; }
    get parkingDrumsPasscheck() { return this.BrakeDrumsRotors === 'Pass'; }get parkingDrumsFailcheck() { return this.BrakeDrumsRotors === 'Fail'; }get parkingDrumsNacheck() { return this.BrakeDrumsRotors === 'Not Applicable'; }
    get hosesPasscheck() { return this.HosesSpacingChaffing === 'Pass'; }get hosesFailcheck() { return this.HosesSpacingChaffing === 'Fail'; }get hosesNacheck() { return this.HosesSpacingChaffing === 'Not Applicable'; }
    get breakTubePasscheck() { return this.BrakeTubing === 'Pass'; }get breakTubeFailcheck() { return this.BrakeTubing === 'Fail'; }get breakTubeNacheck() { return this.BrakeTubing === 'Not Applicable'; }
    get tractorProtectionValvePasscheck() { return this.TractorProtectionValve === 'Pass'; }get tractorProtectionValveFailcheck() { return this.TractorProtectionValve === 'Fail'; }get tractorProtectionValveNacheck() { return this.TractorProtectionValve === 'Not Applicable'; }
    get airCompressorPasscheck() { return this.AirCompressor === 'Pass'; }get airCompressorFailcheck() { return this.AirCompressor === 'Fail'; }get airCompressorNacheck() { return this.AirCompressor === 'Not Applicable'; }
    get electricBrakesPasscheck() { return this.ElectricBrakes === 'Pass'; }get electricBrakesFailcheck() { return this.ElectricBrakes === 'Fail'; }get electricBrakesNacheck() { return this.ElectricBrakes === 'Not Applicable'; }
    get hydraulicBrakesPasscheck() { return this.HydraulicBrakes === 'Pass'; }get hydraulicBrakesFailcheck() { return this.HydraulicBrakes === 'Fail'; }get hydraulicBrakesNacheck() { return this.HydraulicBrakes === 'Not Applicable'; }
    get vacuumSystemsPasscheck() { return this.VacuumSystems === 'Pass'; }get vacuumSystemsFailcheck() { return this.VacuumSystems === 'Fail'; }get vacuumSystemsNacheck() { return this.VacuumSystems === 'Not Applicable'; }
    get pintleHooksPasscheck() { return this.PintleHooks === 'Pass'; }get pintleHooksFailcheck() { return this.PintleHooks === 'Fail'; }get pintleHooksNacheck() { return this.PintleHooks === 'Not Applicable'; }
    get saddleMountsPasscheck() { return this.SaddleMounts === 'Pass'; }get saddleMountsFailcheck() { return this.SaddleMounts === 'Fail'; }get saddleMountsNacheck() { return this.SaddleMounts === 'Not Applicable'; }
    get slidingMechanismPasscheck() { return this.SlidingMechanism === 'Pass'; }get slidingMechanismFailcheck() { return this.SlidingMechanism === 'Fail'; }get slidingMechanismNacheck() { return this.SlidingMechanism === 'Not Applicable'; }
    get fifthWheelLocksPasscheck() { return this.FifthWheelLocksAdjustment === 'Pass'; }get fifthWheelLocksFailcheck() { return this.FifthWheelLocksAdjustment === 'Fail'; }get fifthWheelLocksNacheck() { return this.FifthWheelLocksAdjustment === 'Not Applicable'; }
    get NotLeakingPasscheck() { return this.Not_Leaking === 'Pass'; }get NotLeakingFailcheck() { return this.Not_Leaking === 'Fail'; }get NotLeakingNacheck() { return this.Not_Leaking === 'Not Applicable'; }
    get Won_tburnPasscheck() { return this.Won_t_burn === 'Pass'; }get Won_tburnFailcheck() { return this.Won_t_burn === 'Fail'; }get Won_tburnNacheck() { return this.Won_t_burn === 'Not Applicable'; }
    get WipersPasscheck() { return this.Wipers === 'Pass'; }get WipersFailcheck() { return this.Wipers === 'Fail'; }get WipersNacheck() { return this.Wipers === 'Not Applicable'; }
    get WindShieldPasscheck() { return this.WindShield === 'Pass'; }get WindShieldFailcheck() { return this.WindShield === 'Fail'; }get WindShieldNacheck() { return this.WindShield === 'Not Applicable'; }
    get NoVisibleLeaksPasscheck() {return this.noVisibleLeaks === 'Pass';}get NoVisibleLeaksFailcheck() {return this.noVisibleLeaks === 'Fail';}get NoVisibleLeaksNacheck() {return this.noVisibleLeaks === 'Not Applicable';}
    get FillerCapNotMissingPasscheck() {return this.fillerCapNotMissing === 'Pass';}get FillerCapNotMissingFailcheck() {return this.fillerCapNotMissing === 'Fail';}get FillerCapNotMissingNacheck() {return this.fillerCapNotMissing === 'Not Applicable';}
    get TankSecurelyAttachedPasscheck() {return this.tankSecurelyAttached === 'Pass';}get TankSecurelyAttachedFailcheck() {return this.tankSecurelyAttached === 'Fail';}get TankSecurelyAttachedNacheck() {return this.tankSecurelyAttached === 'Not Applicable';}
    get AllDevicesPasscheck() {
    return this.allDevices === 'Pass';
    }
    get AllDevicesFailcheck() {
        return this.allDevices === 'Fail';
    }
    get AllDevicesNacheck() {
        return this.allDevices === 'Not Applicable';
    }

    get ConspicuityTapePasscheck() {
        return this.conspicuityTape === 'Pass';
    }
    get ConspicuityTapeFailcheck() {
        return this.conspicuityTape === 'Fail';
    }
    get ConspicuityTapeNacheck() {
        return this.conspicuityTape === 'Not Applicable';
    }

    get ProtectionAgainstShiftingCargoPasscheck() {
    return this.protectionAgainstShiftingCargo === 'Pass';
    }
    get ProtectionAgainstShiftingCargoFailcheck() {
        return this.protectionAgainstShiftingCargo === 'Fail';
    }
    get ProtectionAgainstShiftingCargoNacheck() {
        return this.protectionAgainstShiftingCargo === 'Not Applicable';
    }

    get ConditionOfLoadingPasscheck() {
        return this.conditionOfLoading === 'Pass';
    }
    get ConditionOfLoadingFailcheck() {
        return this.conditionOfLoading === 'Fail';
    }
    get ConditionOfLoadingNacheck() {
        return this.conditionOfLoading === 'Not Applicable';
    }

    get SteeringWheelFreePlayPasscheck() {
    return this.steeringWheelFreePlay === 'Pass';
    }
    get SteeringWheelFreePlayFailcheck() {
        return this.steeringWheelFreePlay === 'Fail';
    }
    get SteeringWheelFreePlayNacheck() {
        return this.steeringWheelFreePlay === 'Not Applicable';
    }

    get SteeringColumnPasscheck() {
        return this.steeringColumn === 'Pass';
    }
    get SteeringColumnFailcheck() {
        return this.steeringColumn === 'Fail';
    }
    get SteeringColumnNacheck() {
        return this.steeringColumn === 'Not Applicable';
    }

    get FrontAxleBeamComponentsPasscheck() {
        return this.frontAxleBeamComponents === 'Pass';
    }
    get FrontAxleBeamComponentsFailcheck() {
        return this.frontAxleBeamComponents === 'Fail';
    }
    get FrontAxleBeamComponentsNacheck() {
        return this.frontAxleBeamComponents === 'Not Applicable';
    }

    get SteeringGearBoxPasscheck() {
        return this.steeringGearBox === 'Pass';
    }
    get SteeringGearBoxFailcheck() {
        return this.steeringGearBox === 'Fail';
    }
    get SteeringGearBoxNacheck() {
        return this.steeringGearBox === 'Not Applicable';
    }

    get PitmanArmPasscheck() {
        return this.pitmanArm === 'Pass';
    }
    get PitmanArmFailcheck() {
        return this.pitmanArm === 'Fail';
    }
    get PitmanArmNacheck() {
        return this.pitmanArm === 'Not Applicable';
    }

    get PowerSteeringPasscheck() {
        return this.powerSteering === 'Pass';
    }
    get PowerSteeringFailcheck() {
        return this.powerSteering === 'Fail';
    }
    get PowerSteeringNacheck() {
        return this.powerSteering === 'Not Applicable';
    }

    get BallAndSocketJointsPasscheck() {
        return this.ballAndSocketJoints === 'Pass';
    }
    get BallAndSocketJointsFailcheck() {
        return this.ballAndSocketJoints === 'Fail';
    }
    get BallAndSocketJointsNacheck() {
        return this.ballAndSocketJoints === 'Not Applicable';
    }

    get TieRodsAndDragLinksPasscheck() {
    return this.tieRodsAndDragLinks === 'Pass';
    }
    get TieRodsAndDragLinksFailcheck() {
        return this.tieRodsAndDragLinks === 'Fail';
    }
    get TieRodsAndDragLinksNacheck() {
        return this.tieRodsAndDragLinks === 'Not Applicable';
    }

    get SteeringSystemPasscheck() {
    return this.steeringSystem === 'Pass';
    }
    get SteeringSystemFailcheck() {
        return this.steeringSystem === 'Fail';
    }
    get SteeringSystemNacheck() {
        return this.steeringSystem === 'Not Applicable';
    }

    get NutsPasscheck() {
        return this.nuts === 'Pass';
    }
    get NutsFailcheck() {
        return this.nuts === 'Fail';
    }
    get NutsNacheck() {
        return this.nuts === 'Not Applicable';
    }

    get FrameMembersPasscheck() {
    return this.frameMembers === 'Pass';
    }
    get FrameMembersFailcheck() {
        return this.frameMembers === 'Fail';
    }
    get FrameMembersNacheck() {
        return this.frameMembers === 'Not Applicable';
    }

    get TireAndWheelClearancePasscheck() {
        return this.tireAndWheelClearance === 'Pass';
    }
    get TireAndWheelClearanceFailcheck() {
        return this.tireAndWheelClearance === 'Fail';
    }
    get TireAndWheelClearanceNacheck() {
        return this.tireAndWheelClearance === 'Not Applicable';
    }

    get AdjustableAxleAssembliesPasscheck() {
        return this.adjustableAxleAssemblies === 'Pass';
    }
    get AdjustableAxleAssembliesFailcheck() {
        return this.adjustableAxleAssemblies === 'Fail';
    }
    get AdjustableAxleAssembliesNacheck() {
        return this.adjustableAxleAssemblies === 'Not Applicable';
    }

    get DamagePasscheck() {
    return this.damageCheck === 'Pass';
    }
    get DamageFailcheck() {
        return this.damageCheck === 'Fail';
    }
    get DamageNacheck() {
        return this.damageCheck === 'Not Applicable';
    }

    get ElectricalPasscheck() {
        return this.electricalInspection === 'Pass';
    }
    get ElectricalFailcheck() {
        return this.electricalInspection === 'Fail';
    }
    get ElectricalNacheck() {
        return this.electricalInspection === 'Not Applicable';
    }

    get BoxSkinPasscheck() {
        return this.boxSkinCondition === 'Pass';
    }
    get BoxSkinFailcheck() {
        return this.boxSkinCondition === 'Fail';
    }
    get BoxSkinNacheck() {
        return this.boxSkinCondition === 'Not Applicable';
    }

    get UBoltsTorquePasscheck() {
        return this.uBoltsTorque50lbFt === 'Pass';
    }
    get UBoltsTorqueFailcheck() {
        return this.uBoltsTorque50lbFt === 'Fail';
    }
    get UBoltsTorqueNacheck() {
        return this.uBoltsTorque50lbFt === 'Not Applicable';
    }

    get InspectWeldsPasscheck() {
        return this.inspectWeldsForCracking === 'Pass';
    }
    get InspectWeldsFailcheck() {
        return this.inspectWeldsForCracking === 'Fail';
    }
    get InspectWeldsNacheck() {
        return this.inspectWeldsForCracking === 'Not Applicable';
    }

    get DoorRollerInspectPasscheck() {
        return this.doorRollerInspectionAndLubrication === 'Pass';
    }
    get DoorRollerInspectFailcheck() {
        return this.doorRollerInspectionAndLubrication === 'Fail';
    }
    get DoorRollerInspectNacheck() {
        return this.doorRollerInspectionAndLubrication === 'Not Applicable';
    }

    get HingeInspectPasscheck() {
        return this.hingeInspectionAndLubrication === 'Pass';
    }
    get HingeInspectFailcheck() {
        return this.hingeInspectionAndLubrication === 'Fail';
    }
    get HingeInspectNacheck() {
        return this.hingeInspectionAndLubrication === 'Not Applicable';
    }

    get DoorOperationSealsPasscheck() {
        return this.doorOperationSealsCheck === 'Pass';
    }
    get DoorOperationSealsFailcheck() {
        return this.doorOperationSealsCheck === 'Fail';
    }
    get DoorOperationSealsNacheck() {
        return this.doorOperationSealsCheck === 'Not Applicable';
    }

    get SpringsAirBagsHeightPasscheck() {
    return this.springsAirBagsHeight === 'Pass';
    }
    get SpringsAirBagsHeightFailcheck() {
        return this.springsAirBagsHeight === 'Fail';
    }
    get SpringsAirBagsHeightNacheck() {
        return this.springsAirBagsHeight === 'Not Applicable';
    }

    get SpringHangersPasscheck() {
        return this.springHangers === 'Pass';
    }
    get SpringHangersFailcheck() {
        return this.springHangers === 'Fail';
    }
    get SpringHangersNacheck() {
        return this.springHangers === 'Not Applicable';
    }

    get FrontUBoltTorquePasscheck() {
        return this.frontUBoltTorque270_360lbFt === 'Pass';
    }
    get FrontUBoltTorqueFailcheck() {
        return this.frontUBoltTorque270_360lbFt === 'Fail';
    }
    get FrontUBoltTorqueNacheck() {
        return this.frontUBoltTorque270_360lbFt === 'Not Applicable';
    }

    get RearUBoltTorquePasscheck() {
        return this.rearUBoltTorque420_500lbFt === 'Pass';
    }
    get RearUBoltTorqueFailcheck() {
        return this.rearUBoltTorque420_500lbFt === 'Fail';
    }
    get RearUBoltTorqueNacheck() {
        return this.rearUBoltTorque420_500lbFt === 'Not Applicable';
    }

    get TorqueRadiusTrackingComponentsPasscheck() {
        return this.torqueRadiusOrTrackingComponents === 'Pass';
    }
    get TorqueRadiusTrackingComponentsFailcheck() {
        return this.torqueRadiusOrTrackingComponents === 'Fail';
    }
    get TorqueRadiusTrackingComponentsNacheck() {
        return this.torqueRadiusOrTrackingComponents === 'Not Applicable';
    }

    get InspectReplaceCabinAirFilterPasscheck() {
        return this.InspectReplaceCabinAirFilter === 'Pass';
    }
    get InspectReplaceCabinAirFilterFailcheck() {
        return this.InspectReplaceCabinAirFilter === 'Fail';
    }
    get InspectReplaceCabinAirFilterNacheck() {
        return this.InspectReplaceCabinAirFilter === 'Not Applicable';
    }

    get LockOrSideRingPasscheck() {
        return this.lockOrSideRing === 'Pass';
    }
    get LockOrSideRingFailcheck() {
        return this.lockOrSideRing === 'Fail';
    }
    get LockOrSideRingNacheck() {
        return this.lockOrSideRing === 'Not Applicable';
    }

    get WeldsPasscheck() {
        return this.welds === 'Pass';
    }
    get WeldsFailcheck() {
        return this.welds === 'Fail';
    }
    get WeldsNacheck() {
        return this.welds === 'Not Applicable';
    }

    get WheelsAndRimsPasscheck() {
    return this.wheelsAndRims === 'Pass';
    }
    get WheelsAndRimsFailcheck() {
        return this.wheelsAndRims === 'Fail';
    }
    get WheelsAndRimsNacheck() {
        return this.wheelsAndRims === 'Not Applicable';
    }

    get StudsAndLugNutsPasscheck() {
        return this.studsAndLugNuts === 'Pass';
    }
    get StudsAndLugNutsFailcheck() {
        return this.studsAndLugNuts === 'Fail';
    }
    get StudsAndLugNutsNacheck() {
        return this.studsAndLugNuts === 'Not Applicable';
    }

    get WheelBearingsPasscheck() {
        return this.wheelBearings === 'Pass';
    }
    get WheelBearingsFailcheck() {
        return this.wheelBearings === 'Fail';
    }
    get WheelBearingsNacheck() {
        return this.wheelBearings === 'Not Applicable';
    }

    get AxleSealsPasscheck() {
        return this.axleSeals === 'Pass';
    }
    get AxleSealsFailcheck() {
        return this.axleSeals === 'Fail';
    }
    get AxleSealsNacheck() {
        return this.axleSeals === 'Not Applicable';
    }

    get MudflapsPasscheck() {
        return this.mudflaps === 'Pass';
    }
    get MudflapsFailcheck() {
        return this.mudflaps === 'Fail';
    }
    get MudflapsNacheck() {
        return this.mudflaps === 'Not Applicable';
    }

    get TrianglesPasscheck() {
    return this.triangles === 'Pass';
    }
    get TrianglesFailcheck() {
        return this.triangles === 'Fail';
    }
    get TrianglesNacheck() {
        return this.triangles === 'Not Applicable';
    }

    // Extinguisher__c
    get ExtinguisherPasscheck() {
        return this.extinguisher === 'Pass';
    }
    get ExtinguisherFailcheck() {
        return this.extinguisher === 'Fail';
    }
    get ExtinguisherNacheck() {
        return this.extinguisher === 'Not Applicable';
    }

    // Placards_Holders__c
    get PlacardsHoldersPasscheck() {
        return this.placardsHolders === 'Pass';
    }
    get PlacardsHoldersFailcheck() {
        return this.placardsHolders === 'Fail';
    }
    get PlacardsHoldersNacheck() {
        return this.placardsHolders === 'Not Applicable';
    }

    // Horn__c
    get HornPasscheck() {
        return this.horn === 'Pass';
    }
    get HornFailcheck() {
        return this.horn === 'Fail';
    }
    get HornNacheck() {
        return this.horn === 'Not Applicable';
    }

    // Steering_Axle__c
    get SteeringAxlePasscheck() {
        return this.steeringAxle === 'Pass';
    }
    get SteeringAxleFailcheck() {
        return this.steeringAxle === 'Fail';
    }
    get SteeringAxleNacheck() {
        return this.steeringAxle === 'Not Applicable';
    }

    // All_Other_Tires__c
    get AllOtherTiresPasscheck() {
        return this.allOtherTires === 'Pass';
    }
    get AllOtherTiresFailcheck() {
        return this.allOtherTires === 'Fail';
    }
    get AllOtherTiresNacheck() {
        return this.allOtherTires === 'Not Applicable';
    }

    // Completed__c
    get CompletedPasscheck() {
        return this.completed === 'Pass';
    }
    get CompletedFailcheck() {
        return this.completed === 'Fail';
    }
    get CompletedNacheck() {
        return this.completed === 'Not Applicable';
    }

    get Does_theDOT_InspectionDecalExpirePassCheck(){
        return this.Does_theDOT_InspectionDecalExpire === "Yes (Complete both 'B' and 'C')";
    }
    get Does_theDOT_InspectionDecalExpireFailCheck(){
        return this.Does_theDOT_InspectionDecalExpire === "No (Skip directly to 'C')";
    }

    get Does_theState_InspectionDecalExpireYesCheck(){
        return this.DoestheStateInspectionDecalExpire === "Yes (Complete Both 'E' and 'F')";
    }
    get Does_theState_InspectionDecalExpireNoCheck(){
        return this.DoestheStateInspectionDecalExpire === "No (Skip directly to 'F')";
    }
    get Does_theState_InspectionDecalExpireNaCheck(){
        return this.DoestheStateInspectionDecalExpire === "N/A";
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
