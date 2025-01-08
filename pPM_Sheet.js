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
   
    get gladHandsPassImg() { return this.gladHands === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'}
    get gladHandsFailImg() { return this.gladHands === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick';}
    get gladHandsNaImg() { return this.gladHands === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick';}
    
    get serviceBrakesPassImg() { return this.ServiceBrakes === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get serviceBrakesFailImg() { return this.ServiceBrakes === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get serviceBrakesNaImg() { return this.ServiceBrakes === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
   
    get parkingBrakePassImg() { return this.ParkingBrake === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get parkingBrakeFailImg() { return this.ParkingBrake === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get parkingBrakeNaImg() { return this.ParkingBrake === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get brakeDrumsRotorsPassImg() { return this.BrakeDrumsRotors === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get brakeDrumsRotorsFailImg() { return this.BrakeDrumsRotors === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get brakeDrumsRotorsNaImg() { return this.BrakeDrumsRotors === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get hosesSpacingChaffingPassImg() { return this.HosesSpacingChaffing === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get hosesSpacingChaffingFailImg() { return this.HosesSpacingChaffing === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get hosesSpacingChaffingNaImg() { return this.HosesSpacingChaffing === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get brakeTubingPassImg() { return this.BrakeTubing === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get brakeTubingFailImg() { return this.BrakeTubing === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get brakeTubingNaImg() { return this.BrakeTubing === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get tractorProtectionValvePassImg() { return this.TractorProtectionValve === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get tractorProtectionValveFailImg() { return this.TractorProtectionValve === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get tractorProtectionValveNaImg() { return this.TractorProtectionValve === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick';}
    
    get airCompressorPassImg() { return this.AirCompressor === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get airCompressorFailImg() { return this.AirCompressor === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get airCompressorNaImg() { return this.AirCompressor === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get electricBrakesPassImg() { return this.ElectricBrakes === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get electricBrakesFailImg() { return this.ElectricBrakes === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get electricBrakesNaImg() { return this.ElectricBrakes === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get hydraulicBrakesPassImg() { return this.HydraulicBrakes === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get hydraulicBrakesFailImg() { return this.HydraulicBrakes === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get hydraulicBrakesNaImg() { return this.HydraulicBrakes === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get vacuumSystemsPassImg() { return this.VacuumSystems === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get vacuumSystemsFailImg() { return this.VacuumSystems === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get vacuumSystemsNaImg() { return this.VacuumSystems === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    /*-----------------------------------------breaks ends--------------------------*/

    get pintleHooksPassImg() { return this.PintleHooks === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get pintleHooksFailImg() { return this.PintleHooks === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get pintleHooksNaImg() { return this.PintleHooks === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get saddleMountsPassImg() { return this.SaddleMounts === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get saddleMountsFailImg() { return this.SaddleMounts === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get saddleMountsNaImg() { return this.SaddleMounts === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get slidingMechanismPassImg() { return this.SlidingMechanism === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get slidingMechanismFailImg() { return this.SlidingMechanism === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get slidingMechanismNaImg() { return this.SlidingMechanism === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get fifthWheelLocksPassImg() {return this.FifthWheelLocksAdjustment === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get fifthWheelLocksFailImg() { return this.FifthWheelLocksAdjustment === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get fifthWheelLocksNaImg() { return this.FifthWheelLocksAdjustment === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
   
   /*----------------------------------------coupling tools ends--------------------------*/

   get notLeakingPassImg() { return this.Not_Leaking === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
   get notLeakingFailImg() { return this.Not_Leaking === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
   get notLeakingNaImg() { return this.Not_Leaking === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get wontBurnPassImg() { return this.Won_t_burn === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get wontBurnFailImg() { return this.Won_t_burn === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get wontBurnNaImg() { return this.Won_t_burn === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

 /*----------------------------------------EXHAUST SYSTEM ends--------------------------*/

    get wipersPassImg() { return this.Wipers === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get wipersFailImg() { return this.Wipers === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get wipersNaImg() { return this.Wipers === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get windShieldPassImg() { return this.WindShield === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get windShieldFailImg() { return this.WindShield === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get windShieldNaImg() { return this.WindShield === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

 /*----------------------------------------Winshild,wiper ends--------------------------*/

    get noVisibleLeaksPassImg() { return this.noVisibleLeaks === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get noVisibleLeaksFailImg() { return this.noVisibleLeaks === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get noVisibleLeaksNaImg() { return this.noVisibleLeaks === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get fillerCapNotMissingPassImg() { return this.fillerCapNotMissing === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get fillerCapNotMissingFailImg() { return this.fillerCapNotMissing === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get fillerCapNotMissingNaImg() { return this.fillerCapNotMissing === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get tankSecurelyAttachedPassImg() { return this.tankSecurelyAttached === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get tankSecurelyAttachedFailImg() { return this.tankSecurelyAttached === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get tankSecurelyAttachedNaImg() { return this.tankSecurelyAttached === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

/*----------------------------------------fuel system ends--------------------------*/

    get allDevicesPassImg() { return this.allDevices === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get allDevicesFailImg() { return this.allDevices === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get allDevicesNaImg() { return this.allDevices === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get conspicuityTapePassImg() { return this.conspicuityTape === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get conspicuityTapeFailImg() { return this.conspicuityTape === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get conspicuityTapeNaImg() { return this.conspicuityTape === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

/*----------------------------------------lightnig/refle ends--------------------------*/

    get protectionAgainstShiftingCargoPassImg() { return this.protectionAgainstShiftingCargo === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get protectionAgainstShiftingCargoFailImg() { return this.protectionAgainstShiftingCargo === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get protectionAgainstShiftingCargoNaImg() { return this.protectionAgainstShiftingCargo === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get conditionOfLoadingPassImg() { return this.conditionOfLoading === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get conditionOfLoadingFailImg() { return this.conditionOfLoading === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get conditionOfLoadingNaImg() { return this.conditionOfLoading === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

/*----------------------------------------safe loading ends--------------------------*/

    get steeringWheelFreePlayPassImg() { return this.steeringWheelFreePlay === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get steeringWheelFreePlayFailImg() { return this.steeringWheelFreePlay === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get steeringWheelFreePlayNaImg() { return this.steeringWheelFreePlay === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get steeringColumnPassImg() { return this.steeringColumn === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get steeringColumnFailImg() { return this.steeringColumn === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick';  }
    get steeringColumnNaImg() { return this.steeringColumn === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get frontAxleBeamComponentsPassImg() { return this.frontAxleBeamComponents === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get frontAxleBeamComponentsFailImg() { return this.frontAxleBeamComponents === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get frontAxleBeamComponentsNaImg() {  return this.frontAxleBeamComponents === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get steeringGearBoxPassImg() { return this.steeringGearBox === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get steeringGearBoxFailImg() { return this.steeringGearBox === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get steeringGearBoxNaImg() { return this.steeringGearBox === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get pitmanArmPassImg() { return this.pitmanArm === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get pitmanArmFailImg() { return this.pitmanArm === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get pitmanArmNaImg() { return this.pitmanArm === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get powerSteeringPassImg() { return this.powerSteering === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick';}
    get powerSteeringFailImg() { return this.powerSteering === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get powerSteeringNaImg() { return this.powerSteering === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get ballAndSocketJointsPassImg() { return this.ballAndSocketJoints === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get ballAndSocketJointsFailImg() { return this.ballAndSocketJoints === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get ballAndSocketJointsNaImg() {  return this.ballAndSocketJoints === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get tieRodsAndDragLinksPassImg() { return this.tieRodsAndDragLinks === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get tieRodsAndDragLinksFailImg() { return this.tieRodsAndDragLinks === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get tieRodsAndDragLinksNaImg() { return this.tieRodsAndDragLinks === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get nutsPassImg() { return this.nuts === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get nutsFailImg() { return this.nuts === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get nutsNaImg() { return this.nuts === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get steeringSystemPassImg() { return this.steeringSystem === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get steeringSystemFailImg() { return this.steeringSystem === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get steeringSystemNaImg() { return this.steeringSystem === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

/*----------------------------------------steering mechnisun ends--------------------------*/

    get frameMembersPassImg() { return this.frameMembers === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get frameMembersFailImg() { return this.frameMembers === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get frameMembersNaImg() { return this.frameMembers === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get tireAndWheelClearancePassImg() { return this.tireAndWheelClearance === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get tireAndWheelClearanceFailImg() { return this.tireAndWheelClearance === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get tireAndWheelClearanceNaImg() { return this.tireAndWheelClearance === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get adjustableAxleAssembliesPassImg() { return this.adjustableAxleAssemblies === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get adjustableAxleAssembliesFailImg() { return this.adjustableAxleAssemblies === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    get adjustableAxleAssembliesNaImg() { return this.adjustableAxleAssemblies === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

/*----------------------------------------frame ends--------------------------*/

    get damageCheckPassImg() { return this.damageCheck === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get damageCheckFailImg() { return this.damageCheck === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get damageCheckNaImg() { return this.damageCheck === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get electricalInspectionPassImg() { return this.electricalInspection === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get electricalInspectionFailImg() { return this.electricalInspection === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get electricalInspectionNaImg() { return this.electricalInspection === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get boxSkinConditionPassImg() { return this.boxSkinCondition === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get boxSkinConditionFailImg() { return this.boxSkinCondition === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get boxSkinConditionNaImg() { return this.boxSkinCondition === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get uBoltsTorque50lbFtPassImg() { return this.uBoltsTorque50lbFt === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get uBoltsTorque50lbFtFailImg() { return this.uBoltsTorque50lbFt === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get uBoltsTorque50lbFtNaImg() { return this.uBoltsTorque50lbFt === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get inspectWeldsForCrackingPassImg() { return this.inspectWeldsForCracking === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get inspectWeldsForCrackingFailImg() { return this.inspectWeldsForCracking === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get inspectWeldsForCrackingNaImg() { return this.inspectWeldsForCracking === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get doorRollerInspectionAndLubricationPassImg() { return this.doorRollerInspectionAndLubrication === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get doorRollerInspectionAndLubricationFailImg() { return this.doorRollerInspectionAndLubrication === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get doorRollerInspectionAndLubricationNaImg() { return this.doorRollerInspectionAndLubrication === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get hingeInspectionAndLubricationPassImg() { return this.hingeInspectionAndLubrication === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get hingeInspectionAndLubricationFailImg() { return this.hingeInspectionAndLubrication === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get hingeInspectionAndLubricationNaImg() { return this.hingeInspectionAndLubrication === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get doorOperationSealsCheckPassImg() { return this.doorOperationSealsCheck === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get doorOperationSealsCheckFailImg() { return this.doorOperationSealsCheck === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get doorOperationSealsCheckNaImg() { return this.doorOperationSealsCheck === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
/*----------------------------------------Body ends--------------------------*/

    get springsAirBagsHeightPassImg() { return this.springsAirBagsHeight === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get springsAirBagsHeightFailImg() { return this.springsAirBagsHeight === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get springsAirBagsHeightNaImg() { return this.springsAirBagsHeight === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get springHangersPassImg() { return this.springHangers === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get springHangersFailImg() { return this.springHangers === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get springHangersNaImg() { return this.springHangers === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

    get frontUBoltTorque270_360lbFtPassImg() { return this.frontUBoltTorque270_360lbFt === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get frontUBoltTorque270_360lbFtFailImg() { return this.frontUBoltTorque270_360lbFt === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get frontUBoltTorque270_360lbFtNaImg() { return this.frontUBoltTorque270_360lbFt === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get rearUBoltTorque420_500lbFtPassImg() { return this.rearUBoltTorque420_500lbFt === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get rearUBoltTorque420_500lbFtFailImg() { return this.rearUBoltTorque420_500lbFt === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get rearUBoltTorque420_500lbFtNaImg() { return this.rearUBoltTorque420_500lbFt === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get torqueRadiusOrTrackingComponentsPassImg() { return this.torqueRadiusOrTrackingComponents === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get torqueRadiusOrTrackingComponentsFailImg() { return this.torqueRadiusOrTrackingComponents === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get torqueRadiusOrTrackingComponentsNaImg() { return this.torqueRadiusOrTrackingComponents === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    /*------------------------------rear suspension ends------------------------------------*/

    get InspectReplaceCabinAirFilterPassimg() { return this.InspectReplaceCabinAirFilter === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get InspectReplaceCabinAirFilterFailImg() { return this.InspectReplaceCabinAirFilter === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get InspectReplaceCabinAirFilterNaImg() { return this.InspectReplaceCabinAirFilter === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }

   /*------------------------------HVAC ends------------------------------------*/ 

    get lockOrSideRingPassImg() { return this.lockOrSideRing === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get lockOrSideRingFailImg() { return this.lockOrSideRing === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get lockOrSideRingNaImg() { return this.lockOrSideRing === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get weldsPassImg() { return this.welds === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get weldsFailImg() { return this.welds === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get weldsNaImg() { return this.welds === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get wheelsAndRimsPassImg() { return this.wheelsAndRims === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get wheelsAndRimsFailImg() { return this.wheelsAndRims === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get wheelsAndRimsNaImg() { return this.wheelsAndRims === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get studsAndLugNutsPassImg() { return this.studsAndLugNuts === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get studsAndLugNutsFailImg() { return this.studsAndLugNuts === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get studsAndLugNutsNaImg() { return this.studsAndLugNuts === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get wheelBearingsPassImg() { return this.wheelBearings === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get wheelBearingsFailImg() { return this.wheelBearings === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get wheelBearingsNaImg() { return this.wheelBearings === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get axleSealsPassImg() { return this.axleSeals === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get axleSealsFailImg() { return this.axleSeals === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get axleSealsNaImg() { return this.axleSeals === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    get mudflapsPassImg() { return this.mudflaps === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get mudflapsFailImg() { return this.mudflaps === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get mudflapsNaImg() { return this.mudflaps === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    /*------------------------------Wheels and rims ends------------------------------------*/ 

    get trianglesPassImg() {return this.triangles === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick';}
    get trianglesFailImg() {return this.triangles === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick';}
    get trianglesNaImg() {return this.triangles === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick';}
    
    get extinguisherPassImg() { return this.extinguisher === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get extinguisherFailImg() { return this.extinguisher === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get extinguisherNaImg() { return this.extinguisher === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get placardsHoldersPassImg() { return this.placardsHolders === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get placardsHoldersFailImg() { return this.placardsHolders === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get placardsHoldersNaImg() { return this.placardsHolders === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 

    get hornPassImg() { return this.horn === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get hornFailImg() { return this.horn === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get hornNaImg() { return this.horn === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
    
    /*------------------------------safty ends------------------------------------*/ 

    get steeringAxlePassImg() { return this.steeringAxle === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get steeringAxleFailImg() { return this.steeringAxle === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get steeringAxleNaImg() { return this.steeringAxle === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
    get allOtherTiresPassImg() { return this.allOtherTires === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get allOtherTiresFailImg() { return this.allOtherTires === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get allOtherTiresNaImg() { return this.allOtherTires === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    
/*------------------------------tires ends------------------------------------*/ 

    get completedPassImg() { return this.completed === 'Pass' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get completedFailImg() { return this.completed === 'Fail' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; } 
    get completedNaImg() { return this.completed === 'Not Applicable' ? '/resource/Checkbox_With_Tick' : '/resource/Checkbox_Without_Tick'; }
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
