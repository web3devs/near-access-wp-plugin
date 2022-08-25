<?php

//Based heavily on: https://github.com/tuupola/base58
class Web3devsB58 {
    private $alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    private $characters = [];

    public function __construct() {
        $this->characters = str_split($this->alphabet, 1);
    }

    private function baseConvert(array $source, int $sourceBase, int $targetBase): array {
        $result = [];
        while ($count = count($source)) {
            $quotient = [];
            $remainder = 0;
            for ($i = 0; $i !== $count; $i++) {
                $accumulator = $source[$i] + $remainder * $sourceBase;
                /* Same as PHP 7 intdiv($accumulator, $targetBase) */
                $digit = ($accumulator - ($accumulator % $targetBase)) / $targetBase;
                $remainder = $accumulator % $targetBase;
                if (count($quotient) || $digit) {
                    $quotient[] = $digit;
                }
            }
            array_unshift($result, $remainder);
            $source = $quotient;
        }
    
        return $result;
    }
    
    function encode(string $data): string
    {
        $data = str_split($data);
        $data = array_map("ord", $data);
    
        $leadingZeroes = 0;
        while (!empty($data) && 0 === $data[0]) {
            $leadingZeroes++;
            array_shift($data);
        }
    
        $converted = $this->baseConvert($data, 256, 58);
    
        if (0 < $leadingZeroes) {
            $converted = array_merge(
                array_fill(0, $leadingZeroes, 0),
                $converted
            );
        }
    
        return implode("", array_map(function ($index) {
            return $this->characters[$index];
        }, $converted));
    }
}