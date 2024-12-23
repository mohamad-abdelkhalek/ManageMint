<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserCRUDResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $timezone = $request->header('User-Timezone', 'UTC');
        if (!in_array($timezone, timezone_identifiers_list())) {
            $timezone = 'UTC';
        }

        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            "created_at" => Carbon::parse($this->created_at)
                ->setTimezone($timezone)
                ->format("Y-m-d H:i:s"),
        ];
    }
}
