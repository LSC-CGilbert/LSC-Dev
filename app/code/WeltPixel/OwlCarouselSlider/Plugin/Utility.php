<?php

namespace WeltPixel\OwlCarouselSlider\Plugin;

class Utility extends \WeltPixel\Backend\Plugin\Utility
{
    /**
     * @return string
     */
    protected function getModuleName()
    {
        return $this->convertToString(
            [
                '87', '101', '108', '116', '80', '105', '120', '101', '108', '95', '79', '119', '108', '67', '97',
                '114', '111', '117', '115', '101', '108', '83', '108', '105', '100', '101', '114', '95', '70', '114',
                '101', '101'
            ]
        );
    }

    /**
     * @return array
     */
    protected function _getAdminPaths()
    {
        return [
            $this->convertToString(
                [
                    '115', '121', '115', '116', '101', '109', '95', '99', '111', '110', '102', '105', '103', '47',
                    '101', '100', '105', '116', '47', '115', '101', '99', '116', '105', '111', '110', '47', '119',
                    '101', '108', '116', '112', '105', '120', '101', '108', '95', '111', '119', '108', '95', '115',
                    '108', '105', '100', '101', '114', '95', '99', '111', '110', '102', '105', '103'
                ]
            ),
            $this->convertToString(
                [
                    '115', '121', '115', '116', '101', '109', '95', '99', '111', '110', '102', '105', '103', '47',
                    '101', '100', '105', '116', '47', '115', '101', '99', '116', '105', '111', '110', '47', '119',
                    '101', '108', '116', '112', '105', '120', '101', '108', '95', '111', '119', '108', '95', '99',
                    '97', '114', '111', '117', '115', '101', '108', '95', '99', '111', '110', '102', '105', '103'
                ]
            ),
            $this->convertToString(
                [
                    '119', '101', '108', '116', '111', '119', '108', '99', '97', '114', '111', '117', '115', '101',
                    '108', '47', '98', '97', '110', '110', '101', '114'
                ]
            ),
            $this->convertToString(
                [
                    '119', '101', '108', '116', '111', '119', '108', '99', '97', '114', '111', '117', '115', '101',
                    '108', '47', '115', '108', '105', '100', '101', '114'
                ]
            )
        ];
    }
}
