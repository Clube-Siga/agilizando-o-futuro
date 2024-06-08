<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('courses')->insert([
            [
                'module' => 'John Doe',
                'title' => 'Primeiro Post',
                'resume' => 'Lorem ipsum',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'details' => 'Lorem ipsum',
            ],
            [
                'module' => 'Jane Doe',
                'title' => 'Segundo Post',
                'resume' => 'Lorem ipsum',
                'content' => 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'details' => 'Lorem ipsum',
            ],
        ]);
    }
}
