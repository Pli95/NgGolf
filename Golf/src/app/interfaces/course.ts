export interface Course {
    "id": string;
    "holes": [
        {
            "hole": number;
            "courseHoleId": number;
            "courseId": number;
            "teeBoxes": [
                {
                    "courseHoleTeeBoxId": number;
                    "courseHoleId": number;
                    "teeTypeId": number;
                    "teeType": string;
                    "teeColorTypeId": number;
                    "teeColorType": string;
                    "par": number;
                    "yards": number;
                    "meters": number;
                    "hcp": number;
                    "teeHexColor": string;
                }
            ]
        }
    ]
}

